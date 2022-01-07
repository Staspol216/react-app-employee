import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        { name: 'all', label: 'Все сотрудники' },
        { name: 'rise', label: 'На повышение' },
        { name: 'moreThen1000', label: 'Зп больше 1000$' },
    ];

    const buttons = buttonsData.map(({ name, label }) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button className={`btn ${clazz}`}
                type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}>
                {label}</button>
        )
    })
    // My solution
    // handleFilter = (e) => {
    //     this.props.onFilter(e.currentTarget.getAttribute('data-status'));
    // }
    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;