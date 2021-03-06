import React from 'react';
import PropTypes from 'prop-types';
import {MdClose} from "react-icons/md";
import Style from './AdminModalWithNav.module.scss'
import classNames from 'classnames'
import { Container, Row, Col } from 'reactstrap'
class AdminModalWithNav extends React.Component {

    onCancel = (e) => {
        this.props.onClose(null)
        e.stopPropagation()
    }

    stopPropagation = (e) => {
        e.stopPropagation()
    }

    render() {
        if(!this.props.show) {
            return null;
        }
        const { show, noPadding, ...rest } = this.props;
        return (



            <div className={Style.wrap} onClick={this.onCancel}>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <div className={Style.modal}>
                                <header className={'bg-light text-dark'}>
                                    <div onClick={this.stopPropagation}>{this.props.title}</div>
                                    <div onClick={this.onCancel}>
                                        <MdClose/>
                                    </div>
                                </header>
                                <hr className={'m-0'}/>
                                <div className={classNames(noPadding ? Style.noPadding : null)} onClick={this.stopPropagation}>
                                    {
                                        //children 객체에 props 를 전달
                                        React.cloneElement(this.props.children, {
                                            ...rest,
                                            onClose: this.props.onClose,     //callback
                                            onLoad: this.props.onLoad
                                        })
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

AdminModalWithNav.propTypes = {
    title: PropTypes.any,
    onClose: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.node,
    noPadding: PropTypes.bool
};

AdminModalWithNav.defaultProps = {
    show: false,
    noPadding: false,
    onLoad: ()=>{}
}

export default AdminModalWithNav;