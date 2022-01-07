import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-fliter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: "John C.", salary: 800, increase: false, rise: true, id: 1 },
                { name: "Alex M.", salary: 3000, increase: false, rise: false, id: 2 },
                { name: "Carl W.", salary: 15000, increase: false, rise: false, id: 3 },
            ],
            term: '',
            filter: ''
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            // const index = data.findIndex(elem => elem.id === id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [...before, ...after];
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addItem = (name, salary) => {
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        // this.setState(({ data }) => {
        // const index = data.findIndex(elem => elem.id === id);

        // const old = data[index];
        // const newItem = { ...old, [prop]: !old[prop] };
        // const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

        // return {
        //     data: newArr
        // }
        // });
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term: term });
    }

    // My solution
    // onFilter = (prop) => {
    //     if (prop === "salary") {
    //         this.setState(({ data }) => ({
    //             data: data.filter(item => item[prop] > 1000)
    //         }))
    //     } else if (prop === "increase") {
    //         this.setState(({ data }) => ({
    //             data: data.filter(item => item[prop])
    //         }))
    //     }
    //     else {
    //         this.setState(({ data }) => ({
    //             data: copy
    //         }))
    //     }
    // }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    render() {
        const { data, term, filter } = this.state;
        const employees = this.state.data.length;
        const rised = this.state.data.filter(item => item.rise).length;

        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    rised={rised} />
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        onFilterSelect={this.onFilterSelect}
                        filter={filter} />
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployeesAddForm
                    onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;