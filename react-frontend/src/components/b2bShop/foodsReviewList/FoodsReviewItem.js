import React, { Fragment, useState } from 'react'
import ComUtil from '~/util/ComUtil'
import { IconStarGroup, ImageGalleryModal } from '~/components/common'
import { Server } from '~/components/Properties'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import Style from './FoodsReview.module.scss'
const FoodsReviewItem = (props) => {
    const {orderNo, foodsNo, goodsNm, goodsImageUrl, buyerNo, score, goodsReviewContent, goodsReviewImages, goodsReviewDate, likeCount, readCount, onClick} = props

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }

    function onUpdateClick(){
        props.onClick({type: 'UPDATE', payload: getPayload()})
    }
    function onDeleteClick(){
        props.onClick({type: 'DELETE', payload: getPayload()})
    }

    function getPayload(){
        const payload = Object.assign({}, props)
        delete payload.onClick //속성 삭제
        return payload
    }

    return(
        <Fragment>

            <div className='d-flex p-2 bg-white'>
                <div className='flex-grow-1 pt-2 pb-2 pl-2' style={{width: 50, height: 50}} >
                    <img style={{borderRadius: '100%', width: 50, height: 50, objectFit: 'cover'}} src={goodsImageUrl} alt={'사진'} />
                </div>
                <div className='flex-grow-1 p-2' style={{width: '80%'}}>
                    <div className='d-flex'>
                        <div className='flex-grow-1'>
                            <div className='font-weight-border'>{goodsNm}</div>
                            <div className='d-flex justify-content-start align-items-center'>
                                <IconStarGroup score={score} />
                                <div className='ml-1 text-secondary small'>{` ${ComUtil.utcToString(goodsReviewDate)}`}</div>
                            </div>
                        </div>
                        <div className='p-2'>

                            <Dropdown direction="left" isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle
                                    tag="span"
                                    onClick={toggle}
                                    data-toggle="dropdown"
                                    aria-expanded={dropdownOpen}
                                >
                                    <FontAwesomeIcon
                                        icon={faEllipsisV}
                                        color={'#828282'}
                                        size={'xs'}
                                    />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={onUpdateClick}>리뷰 수정</DropdownItem>
                                    <DropdownItem onClick={onDeleteClick}>리뷰 삭제</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </div>
                    </div>
                    {
                        (goodsReviewImages && goodsReviewImages.length > 0) && (
                            <div className={'d-flex overflow-auto mt-2'}>
                                <ImageGalleryModal
                                    images={goodsReviewImages}
                                    modalImages={goodsReviewImages}
                                    className={'cursor-pointer mr-1'}
                                    style={{width: 70, height: 70, objectFit: 'cover'}}
                                />
                            </div>
                        )
                    }
                    <div className='mt-2' style={{whiteSpace:'pre-line'}}>
                        {goodsReviewContent}
                    </div>
                    <div className='text-secondary small pt-1'>
                        {
                            likeCount > 0 && `좋아요 ${ComUtil.addCommas(likeCount)}개 `
                        }
                        {
                            readCount > 0 && `조회수 ${ComUtil.addCommas(readCount)}`
                        }

                    </div>
                </div>
            </div>
            <hr className='m-0'/>
        </Fragment>
    )
}
export default FoodsReviewItem