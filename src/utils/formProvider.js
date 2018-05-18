import React from 'react';

function formProvider(fields) {
    return function (Comp) {

        const initialFormState = {};
        for(const key in fields) {
            initialFormState[key] = {
                value:fields[key].defaultValue,
                error:''
            };
        }

        class FormComponent extends React.Component{
            constructor(props) {
                super(props);
                this.state = {
                    form:initialFormState,
                    formValid:false
                };

                this.valueChange = his.valueChange.bind(this);
            }

            valueChange(filedName,value){
                const {form} = this.state;

                const newFieldState = {value, valid:true,error:''};

                const fieldRules = field[fieldName].rules;

                for(let i = 0;i<fieldRules.length;i++){
                    const {pattern, error} = fieldRules[i];
                    let valid = false;

                    if(typeof pattern === "function") {
                        valid = pattern(value);
                    } else {
                        valid = pattern.test(value);
                    }

                    if(!valid) {
                        newFieldState.valid = false;
                        newFieldState.error = error;
                        break;
                    }
                }

                const newForm = {...form, [filedName]:newFieldState};
                const formValid = Object.values(newForm).every(f => f.valid);

                this.setState({
                    form:newForm,
                    formValid
                });
            }

            render(){
                const {form, formValid} = this.state;
                return <Comp {...this.props} form={form} formValid={formValid} onFormChange={this.valueChange}/>
            }
        }

        return FormComponent;
    }
}

export default formProvider;