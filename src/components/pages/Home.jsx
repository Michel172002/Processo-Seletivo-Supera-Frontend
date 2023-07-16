import { useEffect, useState } from "react"
import "./Home.css"
import apiFetch from "../../axios/config"
import { useParams } from "react-router-dom"

function Home() {
    const { id } = useParams()

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [opTransf, setOpTransf] = useState("")

    const [transferencias, setTransferencias] = useState([])
    const [value, setValue] = useState()
    const [valueFilter, setValueFilter] = useState()

    const [lastPage, setLastPage] = useState()
    const [firstPage, setFirstPage] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)

    const getValueFilter = async (startDate, endDate, opTransf) => {
        try {
            let urlValue = `/${id}/somaValor`

            if (startDate) {
                urlValue += `?startData=${startDate}`
            }

            if (endDate) {
                urlValue += `${startDate ? '&' : '?'}endData=${endDate}`
            }

            if (opTransf) {
                urlValue += `${startDate || endDate ? '&' : '?'}opTransf=${opTransf}`
            }
            const response = await apiFetch.get(urlValue)
            const data = response.data
            setValueFilter(data)

        } catch (error) {
            console.log(error)
        }
    }

    const getValue = async () => {
        try {
            let urlValue = `/${id}/somaValor`

            const response = await apiFetch.get(urlValue)
            const data = response.data
            setValue(data)

        } catch (error) {
            console.log(error)
        }

    }

    const getTransferencia = async (startDate, endDate, opTransf, page) => {
        try {
            let url = `/${id}?page=${page}`;

            if (startDate) {
                url += `&startData=${startDate}`;
            }

            if (endDate) {
                url += `&endData=${endDate}`;
            }

            if (opTransf) {
                url += `&opTransf=${opTransf}`;
            }

            const response = await apiFetch.get(url);
            const data = response.data;

            setTransferencias(data.content);
            setTotalPages(data.totalPages);
            setPageNumber(data.pageable.pageNumber);
            setFirstPage(data.first);
            setLastPage(data.last);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setCurrentPage(0)
        getTransferencia(startDate, endDate, opTransf, 0)
        getValueFilter(startDate, endDate, opTransf)
    }

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            getTransferencia(startDate, endDate, opTransf, currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
            getTransferencia(startDate, endDate, opTransf, currentPage + 1);
        }
    };

    useEffect(() => {
        getTransferencia(startDate, endDate, opTransf, 0)
        getValue()
        getValueFilter(startDate, endDate, opTransf)
    }, [])

    return (
        <div class="container">
            <form onSubmit={handleSubmit}>
                <div className="row pt-3">
                    <div className="col-3 me-auto p-3">
                        <label class="form-label fs-5">Data de Início</label>
                        <input type="datetime-local" class="form-control" onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="col-3 me-auto p-3">
                        <label class="form-label fs-5">Data de Fim</label>
                        <input type="datetime-local" class="form-control" onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className="col-4 me-auto pt-3 p-1">
                        <label class="form-label fs-5">Nome do operador transacionado</label>
                        <input type="text" class="form-control" onChange={(e) => setOpTransf(e.target.value)} />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary me-5 mt-5">Pesquisar</button>
                </div>
            </form>

            <div className="d-flex justify-content-around mb-2 pt-5">
                <label className="form-label fs-5">Saldo total: R$ {value}</label>
                <label className="form-label fs-5">Saldo no período: R$ {valueFilter}</label>
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
                        {transferencias.length === 0 ? (<tr><td colSpan={4}>Sem Transferencias!</td></tr>) : (
                            transferencias.map((transferencia) => (
                                <tr key={transferencia.id}>
                                    <td scope="row">{new Date(transferencia.dataTransferencia).toLocaleDateString()}</td>
                                    <td>R$ {transferencia.valor}</td>
                                    <td>{transferencia.tipo}</td>
                                    <td>{transferencia.nomeOperadorTransacao}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    {totalPages === 0 ? (null) : (
                        <ul class="pagination">
                            {firstPage === true ? null : (
                                <li class="page-item"><a class="page-link" onClick={goToPreviousPage}>Previous</a></li>
                            )}
                            <li class="page-item"><a class="page-link" href="#">{pageNumber + 1}</a></li>
                            {lastPage === true ? null : (
                                <li class="page-item"><a class="page-link" onClick={goToNextPage}>Next</a></li>
                            )}
                        </ul>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Home