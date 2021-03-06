import { TERMS_OF_DELIVERYFEE } from '../lib/bloceryConst'
import ComUtil from '~/util/ComUtil'
import React from 'react'

function getDeliveryFeeTag(goods){
    const {deliveryFee, deliveryQty, termsOfDeliveryFee} = goods

    switch (termsOfDeliveryFee){
        //무료배송없음(기본배송비이며 몇개를 사던지 배송비 동일)
        case TERMS_OF_DELIVERYFEE.NO_FREE :
            return <span><b>{ComUtil.addCommas(deliveryFee)}원</b></span>
        //무료배송
        case TERMS_OF_DELIVERYFEE.FREE :
            return <span><b>무료배송</b></span>
        //몇개이상 무료배송
        case TERMS_OF_DELIVERYFEE.GTE_FREE :
            return <span><b>{ComUtil.addCommas(deliveryQty)}개</b> 이상 무료배송</span>
        //몇개씩 배송비 부과
        case TERMS_OF_DELIVERYFEE.EACH_GROUP_COUNT :
            return <span><b>{ComUtil.addCommas(deliveryQty)}개씩</b> <b>{ComUtil.addCommas(deliveryFee)}</b>원 부가</span>
        //얼마이상 무료배송
        case TERMS_OF_DELIVERYFEE.GTE_PRICE_FREE :
            return <span><b>{ComUtil.addCommas(deliveryQty)}원</b>이상 무료배송</span>


    }

}
function getDeliveryFee({qty = 1, deliveryFee = 0, deliveryQty = 0, termsOfDeliveryFee = TERMS_OF_DELIVERYFEE.FREE, orderPrice = 0}){

    switch (termsOfDeliveryFee){
        //무료배송없음(기본배송비이며 몇개를 사던지 배송비 동일)
        case TERMS_OF_DELIVERYFEE.NO_FREE :
            return deliveryFee
        //무료배송
        case TERMS_OF_DELIVERYFEE.FREE :
            return 0
        //몇개이상 무료배송
        case TERMS_OF_DELIVERYFEE.GTE_FREE :
            if(qty >= deliveryQty)
                return 0
            else
                return deliveryFee
        //몇개씩 배송비 부과
        case TERMS_OF_DELIVERYFEE.EACH_GROUP_COUNT :

            let num = 0
            let deliveryFeeQty = 0

            if(qty <= deliveryQty){
                return deliveryFee
            }else{
                num = qty / deliveryQty
            }

            //소수점 자리가 있을경우
            if(num % 1 !== 0){
                console.log('is num',num)
                deliveryFeeQty = parseInt(num) + 1
            }else{
                console.log('is no num',num)
                deliveryFeeQty = num
            }
            return deliveryFeeQty * deliveryFee
        //얼마이상 무료배송
        case TERMS_OF_DELIVERYFEE.GTE_PRICE_FREE :
            if(orderPrice >= deliveryQty)
                return 0
            else
                return deliveryFee
        default :
            return 0
    }
}

function getStandardUnitPrice({packAmount, packUnit, foodsQty, currentPrice}){
    let value = 0
    let unit = ''
    const price = (currentPrice / foodsQty) //개당 단가
    if(packUnit === 'g' || packUnit === 'ml'){
        value = price / packAmount * 100
        unit = `100${packUnit}`
    }

    if(packUnit === 'kg' || packUnit === 'L'){

        if(packAmount < 1){
            value = (currentPrice * foodsQty) / packAmount * 0.1
            if(packUnit === 'kg'){
                unit = `100g`
            }else{
                unit = `100ml`
            }
        }else{
            value = price / packAmount
            unit = `1${packUnit}`
        }
    }
    return {
        standardUnit: unit,
        standardUnitPrice: value,
    }
}

export {
    getDeliveryFee,
    getDeliveryFeeTag,
    getStandardUnitPrice
}