<view class="upgrade-page"><view class="status-line" style="{{'height:'+(lineHeight)+';'}}"></view><view style="{{('height:'+headerHeight+'rpx;')}}" id="user_header"><view style="{{('height:'+headerHeight+'rpx;')}}" id="header"><uni-icons class="back-icon" vue-id="1d4183d1-1" type="back" size="32" color="rgba(255,255,255,1)" data-event-opts="{{[['^tap',[['back']]]]}}" bind:tap="__e" bind:__l="__l"></uni-icons><view id="upgrade_vip_title"><text>升级VIP</text></view></view></view><view id="upgrade-content"><view style="{{('margin-top:'+titleTop+'px;height:'+titleHeight+'px;'+'font-size:'+fontSize+'px;')}}" id="activity-title"><text>首充仅1元</text></view><view style="{{('margin-top:'+descTop+'px;margin-bottom:'+descbottom+'px;')}}" id="activity-desc"><text>联系客服即可享优惠</text></view><view style="{{('height:'+memberHeight+'px')}}" id="activity-member"></view><view style="{{('height:'+infoMarginTop+'px;')}}" id="combo-info"><text id="combo-text">请先选择VIP套餐</text></view><view style="{{('margin-top:'+comboDescTop+'px;')}}" id="combo-desc"><text id="combo-text">不错过任何一个你默默想要了解的人</text></view><view style="{{('margin-top:'+comboViewTop+'px;')}}" id="combo-view"><view data-event-opts="{{[['tap',[['selectCombo']]]]}}" class="{{[comboClass1]}}" style="{{('height:'+comboHeight+'px')}}" bindtap="__e"><view class="right-view"><view class="first-line one-first-line" style="{{(level==2?'color:#2177E7':'color:#282828')}}"><text class="number-month">1</text><text>个月</text></view><view class="second-line" style="{{(level==2?'color:#2177E7':'color:#666666')}}"><text>{{"¥"+yuedu_money}}</text></view></view></view><view data-event-opts="{{[['tap',[['selectCombo2']]]]}}" class="{{[comboClass2]}}" style="{{('height:'+comboHeight+'px')}}" bindtap="__e"><view class="right-view"><view class="discount-info"><text>{{"限时"+jiduDiscount+" 折"}}</text></view><view class="first-line" style="{{(level==3?'color:#2177E7':'color:#282828')}}"><text class="number-month">3</text><text>个月</text></view><view class="second-line" style="{{(level==3?'color:#2177E7':'color:#666666')}}"><text>{{"¥"+jidu_money}}</text></view><view class="third-line"><text class="permonth-text">{{"¥"+jidu_permonth_money+"/月"}}</text></view></view></view><view data-event-opts="{{[['tap',[['selectCombo3']]]]}}" class="{{[comboClass3]}}" style="{{('margin-right:0rpx;'+'height:'+comboHeight+'px;')}}" bindtap="__e"><view class="right-view"><view class="discount-info"><text>{{"限时"+nianduDiscount+"折"}}</text></view><view class="first-line" style="{{(level==4?'color:#2177E7':'color:#282828')}}"><text class="number-month">12</text><text>个月</text></view><view class="second-line" style="{{(level==4?'color:#2177E7':'color:#666666')}}"><text>{{"¥"+niandu_money}}</text></view><view class="third-line"><text class="permonth-text">{{"¥"+niandu_permonth_money+"/月"}}</text></view></view></view></view><view style="{{('margin-top:'+comboSubmitTop+'px;height:'+comboSubmitHeight+'px;')}}" id="combo-submit-view"><button data-event-opts="{{[['tap',[['wxPay']]]]}}" bindtap="__e"><text>升级VIP会员 成为聊天达人</text></button></view><uni-popup class="vue-ref" vue-id="1d4183d1-2" id="popupDialog" type="select" data-ref="popupDialog" bind:__l="__l" vue-slots="{{['default']}}"><uni-popup-select vue-id="{{('1d4183d1-3')+','+('1d4183d1-2')}}" bottomData="{{payData}}" data-event-opts="{{[['^select',[['handleSelect']]]]}}" bind:select="__e" bind:__l="__l"></uni-popup-select></uni-popup></view></view>