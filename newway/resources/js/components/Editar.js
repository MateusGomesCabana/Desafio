import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
var tipo = [];
var especialidade = []
var esp = []
var idTipo = 0;
var photoArray = ['braian', 'gruntar', 'lariel', 'maycon', 'mona', 'morgan', 'rakan', 'rank', 'rock', 'steven'];
var photoEdit = "";
var history;
class Editar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            velocidade: '',
            tipo: [],
            especialidade: []
        }
        history = this.props.history;
        this.onSubmitButton = this.onSubmitButton.bind(this);

    }

    /**
     * 2012/2019
     * Mateus Cabana
     * pega todos os tipos de herois
     */
    async componentDidMount() {
        photoEdit = "";

        /**
         * pega todos os tipos salvos no banco para colocar na interface
         */
        await axios.get('/api/tipo', {})
            .then(function (response) {
                tipo = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        /**
         * pega todas as especialidades para colocar na interface
         */
        await axios.get('/api/especialidade', {})
            .then(function (response) {
                especialidade = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({ tipo: tipo });
        this.setState({ especialidade: especialidade });

        if (window.sessionStorage.getItem("key") == 0) {
            this.limparTela();
        } else {
            this.carregaPersonagem();
        }
    }
    /**
     * 22/12/2019
     * Mateus Cabana
     * Funçãoq ue busca o personagem
     */
    async carregaPersonagem() {
        var myMap = new Map();
        var especialidadeIdArray = [];
        var especialidadeStringArray = [];
        await axios.post('/api/heroiId', {
            heroi_id: window.sessionStorage.getItem("key")
        }).then(res => {
            for (var i = 0; i < res.data.length; i++) {
                if (myMap.has(res.data[i].id)) {
                    var aux = myMap.get(res.data[i].id)
                    especialidadeIdArray = aux.especialidade_id;
                    especialidadeStringArray = aux.especialidade;
                    especialidadeIdArray.push(res.data[i].especialidade_id)
                    especialidadeStringArray.push(res.data[i].especialidade)
                } else {
                    especialidadeIdArray.push(res.data[i].especialidade_id)
                    especialidadeStringArray.push(res.data[i].especialidade)
                }
                var heroiControl = {
                    id: res.data[i].id,
                    name: res.data[i].name,
                    tipo_id: res.data[i].tipo_id,
                    vida: res.data[i].vida,
                    defesa: res.data[i].defesa,
                    dano: res.data[i].dano,
                    velocidade: res.data[i].velocidade,
                    velocidade_movimento: res.data[i].velocidade_movimento,
                    photo: res.data[i].photo,
                    tipo: res.data[i].tipo,
                    especialidade: especialidadeStringArray,
                    especialidade_id: especialidadeIdArray
                }
                myMap.set(res.data[i].id, heroiControl);
            }
            this.completaCampos(myMap);
        })
    }
    /**
     * 22/12/2019
     * Mateus Cabana
     * Função que completa os campos do personagem ja salvo
     */
    completaCampos(myMap) {
        for (var key of myMap.keys()) {
            var heroiControl = myMap.get(key);
            document.getElementById("inputName").value = heroiControl.name
            document.getElementById("vida").value = heroiControl.vida
            document.getElementById("defesa").value = heroiControl.defesa
            document.getElementById("dano").value = heroiControl.dano
            document.getElementById("vAtaque").value = heroiControl.velocidade
            document.getElementById("vMovimento").value = heroiControl.velocidade_movimento
            photoEdit = heroiControl.photo;
            for (var i = 0; i < heroiControl.especialidade.length; i++) {
                document.getElementById(heroiControl.especialidade[i] + heroiControl.especialidade_id[i]).checked = true;
            }
            $(".selectpicker").val(heroiControl.tipo_id);
        }
    }
    /**
     * 22/12/2019
     * Mateus Cabana
     * Função de submissão dos dados da tela
     * @param {*} e 
     */
    onSubmitButton(e) {
        e.preventDefault();
        var id = window.sessionStorage.getItem("key");
        //id = 0;
        esp.length = 0
        idTipo = 0;
        var flag = this.verificaCampos();
        if (flag) {
            //inserir 
            if (id == 0) {
                axios.post('/api/heroi', {
                    name: document.getElementById("inputName").value,
                    vida: parseInt(document.getElementById("vida").value),
                    defesa: parseInt(document.getElementById("defesa").value),
                    dano: parseInt(document.getElementById("dano").value),
                    velocidade: parseFloat(document.getElementById("vAtaque").value),
                    velocidade_movimento: parseInt(document.getElementById("vMovimento").value),
                    tipo_id: parseInt(idTipo),
                    photo: photoArray[Math.floor(Math.random() * (9))]
                }).then(res => {
                    //funcionou a inserção
                    if (res.status == 201) {
                        id = res.data.heroi.id;
                        var verify = true;
                        for (var i = 0; i < esp.length; i++) {
                            axios.post('/api/heroi_especialidade', {
                                heroi_id: id,
                                especialidade_id: esp[i].id,
                                especialidade: esp[i].espNome
                            }).then(res => {
                                if (res.status != 201) {
                                    verify = false;
                                }
                            }).catch(err => this.deletar(id))
                        }
                        if (verify == true) {
                            alert('Heroi inserido com sucesso');
                            this.limparTela();
                            history.push('/');
                        }
                    }
                    //erro
                    else {
                        alert('Erro ao inserir :(');
                    }
                }).catch(err => console.log('Erro ao inserir'));

            }//editar
            else if (id != 0) {
                axios.put('/api/heroi/' + id, {
                    name: document.getElementById("inputName").value,
                    vida: parseInt(document.getElementById("vida").value),
                    defesa: parseInt(document.getElementById("defesa").value),
                    dano: parseInt(document.getElementById("dano").value),
                    velocidade: parseFloat(document.getElementById("vAtaque").value),
                    velocidade_movimento: parseInt(document.getElementById("vMovimento").value),
                    tipo_id: parseInt(idTipo),
                    photo: photoEdit
                }).then(res => {
                    //funcionou a inserção
                    if (res.status == 201) {
                        this.deletarEsp(id);
                        var verify = true;

                        for (var i = 0; i < esp.length; i++) {
                            axios.post('/api/heroi_especialidade', {
                                heroi_id: id,
                                especialidade_id: esp[i].id,
                                especialidade: esp[i].espNome
                            }).then(res => {
                                if (res.status != 201) {
                                    verify = false;
                                }
                            }).catch(err => this.deletar(id))
                        }
                        if (verify == true) {
                            alert('Heroi atualizado com sucesso');
                            history.push('/');
                        }
                    }

                })
            }
        }
    }
    /**
     * 22/12/2019
     * Mateus Cabana
     * Função que verifica se os campos foram preenchidos
     */
    verificaCampos() {
        //verifica se o campo de nome foi preenchido
        if (document.getElementById("inputName").value == "") {
            alert('preencha o nome do heroi');
            return false;
        }//verifica se o campo de vida de vida foi preenchido 
        else if (document.getElementById("vida").value == "") {
            alert('preencha a vida do heroi');
            return false;
        }//verifica se o campo de vida de defesa foi preenchido 
        else if (document.getElementById("defesa").value == "") {
            alert('preencha a defesa do heroi');
            return false;
        }//verifica se o campo de dano foi preenchido  
        else if (document.getElementById("dano").value == "") {
            alert('preencha o dano do heroi');
            return false;
        }//verifica se a velocidade de ataque 
        else if (document.getElementById("vAtaque").value == "") {
            alert('preencha a velocidade de atque do heroi');
            return false;
        }//verifica se a velocidade de movimento 
        else if (document.getElementById("vMovimento").value == "") {
            alert('preencha a velocidade do movimento do heroi do heroi');
            return false;
        }

        Array.from($(".selectpicker").find(':selected')).map(function (item) {
            idTipo = ($(item).val())

        });
        if (idTipo == 0) {
            alert('Escolha o tipo do heroi');
            return false;
        }
        for (var i = 0; i < especialidade.length; i++) {
            if (document.getElementById(especialidade[i].especialidade + especialidade[i].id).checked == true) {
                esp.push({ id: especialidade[i].id, espNome: especialidade[i].especialidade })
            }
        }
        if (esp.length == 0) {
            alert('Selecione uma especialidade');
            return false;
        }
        return true;
    }
    /**
     * 21/12/2019
     * Mateus Cabana
     * Caso a inserção nao funcione devo deletar o usuario inserido
     */
    deletar(id) {
        axios.delete('/api/heroi/' + id, {}).then(res => {
            console.log(res);
        })
    }
    /**
     * 21/12/2019
     * Mateus Cabana
     * Caso a inserção nao funcione devo deletar o usuario inserido
     */
    deletarEsp(id) {

        axios.post('/api/heroi_especialidadeID', {
            heroi_id: id
        }).then(res => {
            var espId = res.data;
            for (var i = 0; i < espId.length; i++) {
                //Deleta as especialidades para inserir
                axios.delete('/api/heroi_especialidade/' + espId[i].id, {})
            }
        })
    }
    /**
     * 22/12/2019
     * Mateus Cabana
     * Função que limpa todos os campos da tela
     */
    limparTela() {
        document.getElementById("inputName").value = ""
        document.getElementById("vida").value = ""
        document.getElementById("defesa").value = ""
        document.getElementById("dano").value = ""
        document.getElementById("vAtaque").value = ""
        document.getElementById("vMovimento").value = ""
        for (var i = 0; i < especialidade.length; i++) {
            document.getElementById(especialidade[i].especialidade + especialidade[i].id).checked = false
        }
    }
    onAmountChange (e) {
        const amount = e.target.value;
        // value={this.state.velocidade} onChange={event => this.setState({velocidade: event.target.value.replace(/\D/,'')})}
        if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
          this.setState(() => ({ velocidade:amount }));
        }
      };

    render() {
        return (
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.onSubmitButton}>
                                    <strong>Nome:</strong>
                                    <input type="text" name="name" className="form-control" id="inputName" />
                                    <strong>Tipo:</strong>
                                    <select class="selectpicker form-control" id='empid' >
                                        {
                                            this.state.tipo.map((val, idx) => {
                                                return (
                                                    <option value={val.id} >{val.tipo}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <strong>Especialidades:</strong>
                                    <div class="container">
                                        <div class="row">
                                            {
                                                this.state.especialidade.map((val, idx) => {
                                                    var idEsp = val.especialidade + val.id

                                                    return (
                                                        <div class="col-12">

                                                            <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id={idEsp} />
                                                                <label class="custom-control-label" for={idEsp}>{val.especialidade}</label>
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                    <strong>Vida:</strong>
                                    <input type="number" name="vida" className="form-control" id="vida"  />
                                    <strong>Defesa:</strong>
                                    <input type="number" name="defesa" className="form-control" id="defesa" />
                                    <strong>Dano:</strong>
                                    <input type="number" name="dano" className="form-control" id="dano" />
                                    <strong>Velocidade do ataque:</strong>
                                    <input type="number" step="0.1" name="Vataque" className="form-control" id="vAtaque"  />
                                    <strong>Velocidade do movimento:</strong>
                                    <input type="number" name="Vmovimento" className="form-control" id="vMovimento"  />
                                    <button className="btn btn-success" >Salvar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Editar;