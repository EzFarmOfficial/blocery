import React, {useState} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {FaCheck} from 'react-icons/fa'
import classNames from 'classnames'
const CheckList = (props) => {
    const {data, className = null} = props
    const [value, setValue] = useState(props.value)

    function onClick(item) {
        setValue(item.value)
        props.onClick(item)
    }

    return(
        <ListGroup className={className || null}>
            {
                data.map((item, index) =>
                    <ListGroupItem key={'checkList_listGroupItem'+index} action className={classNames('d-flex')} onClick={onClick.bind(this, item)}>
                        <span>{item.label}</span>
                        {item.value === value && <span className='ml-auto'><FaCheck className={'text-info'} /></span>}
                    </ListGroupItem>
                )
            }
        </ListGroup>
    )
}
export default CheckList