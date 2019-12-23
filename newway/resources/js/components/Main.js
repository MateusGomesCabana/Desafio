import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import braian from '../heróis/braian/braian.gif';
var logos = [];
var history;
var myMap = new Map()
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            logos: [],
            myMap: {}
        }
        history = this.props.history;
        this.handleClick = this.handleClick.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.adicionarHeroi = this.adicionarHeroi.bind(this);
    }
    async componentDidMount() {
        window.sessionStorage.setItem('key','0');
        myMap = new Map();
        /**
         * 22/12/2019
         * Mateus Cabana
         * Api que puxa todos os herois e organiza a json para montar o front
         */
        await axios.get('/api/heroi2', {})
            .then(function (response) {
                logos = response.data;
                for (var i = 0; i < logos.length; i++) {
                    if (myMap.has(logos[i].id)) {
                        var aux = myMap.get(logos[i].id)
                        var especialidadeString = aux.especialidade + ", "
                        especialidadeString = especialidadeString + logos[i].especialidade;

                    } else {
                        var especialidadeString = logos[i].especialidade
                    }
                    var heroiControl = {
                        id: logos[i].id,
                        name: logos[i].name,
                        tipo_id: logos[i].tipo_id,
                        vida: logos[i].vida,
                        defesa: logos[i].defesa,
                        dano: logos[i].dano,
                        velocidade: logos[i].velocidade,
                        velocidade_movimento: logos[i].velocidade_movimento,
                        photo: logos[i].photo,
                        tipo: logos[i].tipo,
                        especialidade: especialidadeString,
                    }
                    myMap.set(logos[i].id, heroiControl);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        logos.length = 0;
        for (var key of myMap.keys()) {
            logos.push(myMap.get(key))
        }
        this.setState({ logos: logos });
        this.setState({ myMap: myMap });
    }

    /**
     * 20/12/2019
     * Mateus Cabana
     * Função que pega o id da edição da edição do heroi
     * @param {*} e 
     */
    handleClick(e) {
        window.sessionStorage.setItem('key', event.target.getAttribute('id'));
        //console.log(event.target.getAttribute('id'))

       // console.log(this.props.history)
        console.log('edita heroi heroi')
        history.push('/editar');
    }
    /**
     * 20/12/2019
     * Mateus Cabana
     * Função que pega o id da edição da edição do heroi
     * @param {*} e 
    */
    async handleClickDelete(e) {
        console.log('deleta heroi')
        var id = event.target.getAttribute('id');
        await axios.post('/api/heroi_especialidadeID', {
            heroi_id: id
        }).then(res => {
            var espId = res.data;
            for (var i = 0; i < espId.length; i++) {
                //Deleta as especialidades para inserir
                axios.delete('/api/heroi_especialidade/'+espId[i].id, {}).then(res=>{
                    console.log(res)
                })
                
            }
        })
        await axios.delete('/api/heroi/'+id, {}).then(res => {
            alert('Heroi removido com sucesso');
        }).catch(err=>alert('Erro ao deletar'))
         this.forceUpdate();
         location.reload();
         
    }
    /**
     * 22/12/2019
     * Mateus Cabana
     * Função que adicona um heroi
     */
    adicionarHeroi(e){
        window.sessionStorage.setItem('key','0');
        console.log('adiciona heroi')
        history.push('/editar');
    }
    render() {
        return (
            <div className='container'>
                <div class="row">
                    {
                        this.state.logos.map((val, idx) => {
                            var iddiv = val.id + "-" + val.name;
                           
                            return (
                                <div id={iddiv}>
                                    <div className="col">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3>{val.name}</h3>
                                                <img src={require('../heróis/'+val.photo+'/'+val.photo+'.gif')} alt="loading..." />
                                                <br />
                                                <strong>Tipo: </strong>{val.tipo}
                                            </div>
                                            <div className="card-body">
                                                <strong>Especialidade: </strong><span>{val.especialidade}</span>
                                                <br />
                                                <strong>Vida: </strong><span>{val.vida}</span>
                                                <br />
                                                <strong>Defesa: </strong><span>{val.defesa} </span>
                                                <br />
                                                <strong>Dano: </strong><span>{val.dano} </span>
                                                <br />
                                                <strong>Velocidade: </strong><span>{val.velocidade}</span>
                                                <br />
                                                <strong>Velocidade do movimento: </strong><span>{val.velocidade_movimento}</span>
                                                <br />

                                                <button className="btn btn-success" id={val.id} onClick={(e) => this.handleClick(e)}>Editar</button>
                                                <button className="btn btn-danger" id={val.id} onClick={(e) => this.handleClickDelete(e)}>Deletar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h3>Adicionar Herói</h3>
                                <button className="btn btn-primary"  onClick={(e) => this.adicionarHeroi(e)}>Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Main;