import './app-filter.css';

const AppFilter = () => {
    return (
        <div className="btn-group">
            <button className="btn btn-outline-light" type="button">Все струдники</button>
            <button className="btn btn-outline-light" type="button">На повышение</button>
            <button className="btn btn-outline-light" type="button">Зп больше 1000$</button>
        </div>
    )
}

export default AppFilter;