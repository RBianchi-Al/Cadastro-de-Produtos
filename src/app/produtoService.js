const PRODUTOS = '_PRODUTOS';


function erroValidacao(erros) {
    this.erros = erros;
}

export default class ProdutoService {
    validar = (produto) => {
        const erros = []
        if (!produto.nome) {
            erros.push('O campo nome é obrigatório')
        }
        if (!produto.sku) {
            erros.push('O campo SKU é obrigatório')
        }

        if (!produto.preco || produto.preco <= 0) {
            erros.push('O campo preço deve ter um valor maior que zero')
        }

        if (!produto.fornecedor) {
            erros.push('O campo fornecedor é obrigatório')
        }
        if (erros.length > 0) {
            throw new erroValidacao(erros)
        }
    }


    oberProdutos = () => {
        const produtos = localStorage.getItem(PRODUTOS)
        if(!produtos){
            return []
        }
        return JSON.parse(produtos)
    }

    obterIndex = (sku) => {
        let index = null;
        this.oberProdutos().forEach((produto, i) => {
            if (produto.sku === sku) {
                index = i
            }
        })
        return index;
    }

    deletar = (sku) => {
        const index = this.obterIndex(sku)
        if(index !== null){
            const produtos = this.oberProdutos()
            produtos.splice(index, 1)
            localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
            return produtos
        }
    }

    salvar = (produto) => {

        this.validar(produto);

        let produtos = localStorage.getItem(PRODUTOS)

        if (!produtos) {
            produtos = []
        } else {
            produtos = JSON.parse(produtos)
        }

        const index = this.obterIndex(produto.sku)

        if (index === null) {
            produtos.push(produto);
        } else {
            produtos[index] = produto;
        }

        localStorage.setItem(PRODUTOS, JSON.stringify(produtos))
    }
}
