import React from 'react';
import ProdutoService from '../../app/produtoService';
import { withRouter} from 'react-router-dom';

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    cadastrosucesso: false,
    erros: [],
    atualizando: false

}

class CadastroProduto extends React.Component {

    state = estadoInicial;

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value
        const nomedoCampo = event.target.name

        this.setState({
            [nomedoCampo]: valor
        })

    }

    onSubmit = (event) => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor

        }
        try {
            this.service.salvar(produto);
            this.limpaCampos();
            this.setState({ cadastrosucesso: true })
        } catch (erro) {
            const erros = erro.erros
            this.setState({erros : erros})

        }


    }

    limpaCampos = () => {
        this.setState(estadoInicial)
    }

    componentDidMount(){
        const sku = this.props.match.params.sku

        if (sku){
           const resultado = this
           .service
           .oberProdutos().filter(produto => produto.sku === sku)
        
        if(resultado.length === 1){
           const produtoEncontrado = resultado[0]
           this.setState({...produtoEncontrado, atualizando: true})
        }
    }
}

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.state.atualizando ? 'Atualização ' : 'Cadastro '}
                    de produtos
            </div>
                <div className="card-body">
                    {/* pode fazer por operador ternario ou colocando && q vai renderizar quando for true */}
                    {this.state.cadastrosucesso &&
                        (<div className="alert alert-dismissible alert-success">
                            <button type="button"
                                class="close"
                                data-dismiss="alert">&times;</button>
                            <strong>Deu certo!</strong> Cadastro realizado com sucesso.
                        </div>)}

                    { this.state.erros.length > 0 && this.state.erros.map( msg => {
                        return (
                            <div className="alert alert-dismissible alert-danger">
                                <button type="button"
                                        class="close"
                                        data-dismiss="alert">&times;</button>
                                <strong>Erro!</strong> {msg}    
                            </div>
                            )                           
                        })
                    }

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text"
                                    className="form-control"
                                    name="nome"
                                    onChange={this.onChange}
                                    value={this.state.nome}></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text"
                                    className="form-control"
                                    name="sku"
                                    disabled={this.state.atualizando}
                                    onChange={this.onChange}
                                    value={this.state.sku}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea className="form-control"
                                    name="descricao"
                                    onChange={this.onChange}
                                    value={this.state.descricao}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço *</label>
                                <input type="text"
                                    className="form-control"
                                    name="preco"
                                    onChange={this.onChange}
                                    value={this.state.preco}></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor *</label>
                                <input type="text"
                                    className="form-control"
                                    name="fornecedor"
                                    onChange={this.onChange}
                                    value={this.state.fornecedor}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-success"
                                onClick={this.onSubmit}>
                                    {this.state.atualizando ? 'Atualizar' : 'Salvar'} </button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-primary"
                                onClick={this.limpaCampos}>Limpar</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default withRouter(CadastroProduto); 