<view class="uni-popup-dialog data-v-38bbfaaa"><block qq:if="{{!isHideTitle}}"><view class="uni-dialog-title data-v-38bbfaaa"><text class="{{['uni-dialog-title-text data-v-38bbfaaa','uni-popup__'+dialogType]}}">{{title}}</text></view></block><view class="uni-dialog-content data-v-38bbfaaa" style="{{(isHideTitle?'margin-top: 10px;':'')}}"><block qq:if="{{mode==='base'}}"><text class="uni-dialog-content-text data-v-38bbfaaa">{{content}}</text></block><block qq:else><input class="uni-dialog-input data-v-38bbfaaa" type="text" placeholder="{{placeholder}}" focus="{{focus}}" data-event-opts="{{[['input',[['__set_model',['','val','$event',[]]]]]]}}" value="{{val}}" bindinput="__e"/></block></view><view class="uni-dialog-button-group data-v-38bbfaaa"><view data-event-opts="{{[['tap',[['close',['$event']]]]]}}" class="{{['data-v-38bbfaaa','uni-dialog-button uni-dialog-cancel'+(isGetPhoneButton?' uni-dialog-phone-button':'')]}}" bindtap="__e"><text class="uni-dialog-button-text data-v-38bbfaaa">{{cancelText}}</text></view><view data-event-opts="{{[['tap',[['onOk',['$event']]]]]}}" class="{{['data-v-38bbfaaa','uni-dialog-button uni-border-left uni-dialog-ok'+(isGetPhoneButton?' uni-dialog-phone-button':'')]}}" bindtap="__e"><block qq:if="{{isGetPhoneButton}}"><button class="phone-button data-v-38bbfaaa" open-type="getPhoneNumber" data-event-opts="{{[['getphonenumber',[['getPhoneNumber',['$event']]]]]}}" bindgetphonenumber="__e"><text class="uni-dialog-button-text uni-button-color data-v-38bbfaaa" style="{{('color:'+okColor)}}">{{okText}}</text></button></block><block qq:else><text class="uni-dialog-button-text uni-button-color data-v-38bbfaaa">{{okText}}</text></block></view></view></view>