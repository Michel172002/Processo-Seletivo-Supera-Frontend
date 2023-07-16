import "./Home.css"

function Home() {
    return (
        <div class="container">
            <form>
                <div className="row pt-3">
                    <div className="col-3 me-auto p-3">
                        <label class="form-label">Data de Início</label>
                        <input type="datetime-local" class="form-control" />
                    </div>
                    <div className="col-3 me-auto p-3">
                        <label class="form-label">Data de Fim</label>
                        <input type="datetime-local" class="form-control" />
                    </div>
                    <div className="col-4 me-auto pt-3 p-1">
                        <label class="form-label ">Nome do operador transacionado</label>
                        <input type="text" class="form-control" />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary me-5 mt-5">Pesquisar</button>
                </div>
            </form>

            <div className="d-flex justify-content-around mb-2 pt-5">
                <label className="form-label fs-5">Saldo total: R$ 50,00</label>
                <label className="form-label fs-5">Saldo no período: R$ 50,00</label>
            </div>
            <div class="table-responsive">
                <table class="table align-middle">
                    <thead className="table-light"> 
                        <tr>
                            <th scope="col" className="date-column">Data</th>
                            <th scope="col" className="value-column">Valor</th>
                            <th scope="col" className="type-column">Tipo</th>
                            <th scope="col" className="name-column">Nome do operador transacionado</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr>
                            <td scope="row">14/02/2019</td>
                            <td>R$ 30895,46</td>
                            <td>depósito</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td scope="row">12/04/2019</td>
                            <td>R$ 12,24</td>
                            <td>Transferência Entrada</td>
                            <td>Fulano</td>
                        </tr>
                        <tr>
                            <td scope="row">11/06/2020</td>
                            <td>R$ -500,50</td>
                            <td>Transferência Saída</td>
                            <td>Sicrano</td>
                        </tr>
                        <tr>
                            <td scope="row">11/06/2020</td>
                            <td>R$ -1234,00</td>
                            <td>Saque</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Home