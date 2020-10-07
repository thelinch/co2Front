import React from 'react';
class App extends React.Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
        });
    }
    render() {
        return (
            <div className="container">
                My App Component 1dwdw
                <div className="card">
                    <div className="card-body">dwdw</div>
                </div>
                <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>


                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>

            </div>

        );
    }
}
export default App