import React from 'react'
import Style from './ShopOnlyXButtonNav.module.scss'
import PropTypes from 'prop-types'
import { Webview } from '~/lib/webviewApi'
import { XButton } from '~/components/common'
const ShopOnlyXButtonNav = (props) => {
    const close = () => {
        Webview.closePopup()
    }
    const back = () => {
        if(props.history.action === 'PUSH') props.history.goBack(); //팝업 안에서 이동.
        else window.location = '/home/1'    //페이지가 window.location 을 통해 들어왔을 경우 history의 goBack() 할 수가 없어 메인 페이지로 이동하게 함
    }
    return(
        <div className={Style.wrap}>
            {
                props.close ? <XButton close onClick={close} style={props.style} /> : <XButton back onClick={back} style={props.style} />
            }
        </div>
    )
}

ShopOnlyXButtonNav.propTypes = {
    close: PropTypes.bool
}
ShopOnlyXButtonNav.defaultProps = {
    close: false
}


export default ShopOnlyXButtonNav