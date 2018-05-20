import React from 'react';
import PropTypes from 'prop-types';
import style from '../styles/auto-complete.less';


function getItemValue(item) {
    return item.value || item;
}

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: '',
            activeItemIndex: -1
        };
        this.keyDown = this.keyDown.bind(this);
        this.leave = this.leave.bind(this);
    }

    change(value,e) {
        this.setState({
            displayValue: '',
            activeItemIndex: -1
        });
        if(!e.target.name){
            e.target.name = this.props.name;
        }
        this.props.onValueChange(e);
    }

    keyDown(e) {
        const { activeItemIndex } = this.state;
        const { options } = this.props;
        switch (e.keyCode) {
            // 13为回车键的键码（keyCode）
            case 13: {
                if (activeItemIndex >= 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.change(getItemValue(options[activeItemIndex]),e);
                }
                break;
            }
            // 38为上方向键，40为下方向键
            case 38:
            case 40: {
                e.preventDefault();
                this.moveItem(e.keyCode === 38 ? 'up' : 'down');
                break;
            }
        }
    }

    moveItem(direction) {
        const { activeItemIndex } = this.state;
        const { options } = this.props;
        const lastIndex = options.length - 1;
        let newIndex = -1;
        if (direction === 'up') {
            newIndex = (activeItemIndex === -1 ? lastIndex : activeItemIndex - 1);
        } else {
            if (activeItemIndex < lastIndex) {
                newIndex = activeItemIndex + 1;
            }
        }

        let newDisplayValue = '';
        if (newIndex >= 0) {
            newDisplayValue = getItemValue(options[newIndex]);
        }

        this.setState({
            displayValue: newDisplayValue,
            activeItemIndex: newIndex
        });
    }

    enter(index) {
        const currentItem = this.props.options[index];
        this.setState({
            displayValue: getItemValue(currentItem),
            activeItemIndex: index
        });
    }

    leave() {
        this.setState({
            displayValue: '',
            activeItemIndex: -1
        });
    }

    click() {

    }

    render() {
        const { displayValue, activeItemIndex } = this.state;
        const { value, options, name } = this.props;
        return (
            <div className='wrapper'>
                <input type='text'
                    name={name}
                    value={displayValue || value}
                    onChange={e => this.change(e.target.value,e)}
                    onKeyDown={this.keyDown}
                />
                {
                    options.length > 0 && (
                        <ul className='options'>
                            {
                                options.map((item, index) => {
                                    return (
                                        <li name={name}
                                            key={index}
                                            className={activeItemIndex === index ? 'active' : ''}
                                            onMouseEnter={() => this.enter(index)}
                                            onClick={(e) => this.change(getItemValue(item),e)}
                                        >
                                            {item.text || item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }

            </div>
        );
    }
}

AutoComplete.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onValueChange: PropTypes.func.isRequired
}

export default AutoComplete;