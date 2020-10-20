<template>
	<view>
		<view id="resp">
			<rich-text :nodes="htmlStr"></rich-text>
		</view>
	</view>
</template>



<script>
	import parseHtml from '../../common/html_parse.js';
	let htmlStr = `<p style="text-align:center">
    <span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体;text-align:center;font-weight:bolder;">隐私政策</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">&nbsp;&nbsp;&nbsp;</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，</span> </span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">会按照本隐私权政策的规定使用和披露您的个人信息。但</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">不会将这些信息对外披露或向第三方提供。</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">会不时更新本隐私权政策。您在同意</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">服务使用协议不可分割的一部分。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">1. <span style="font-family:宋体">适用范围</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(a) <span style="font-family:宋体">在您注册</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">帐号时，您根据</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">要求提供的个人注册信息；</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(b) <span style="font-family:宋体">在您使用</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">网络服务，或访问</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">平台网页时，</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的</span>IP<span style="font-family:宋体">地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(c) </span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">通过合法途径从商业伙伴处取得的用户个人数据。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">您了解并同意，以下信息不适用本隐私权政策：</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(a) <span style="font-family:宋体">您在使用</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">平台提供的搜索服务时输入的关键字信息；</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(b) </span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">收集到的您在</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">发布的有关信息数据，包括但不限于参与活动、成交信息及评</span> </span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">价详情；</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(c) <span style="font-family:宋体">违反法律规定或违反</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">规则行为及</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">已对您采取的措施。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">2. <span style="font-family:宋体">信息使用</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(a)</span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">（含</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(b) </span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">平台用户如从事上述活动，一经发现，</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">有权立即终止与该用户的服务协议。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(c) <span style="font-family:宋体">为服务用户的目的，</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">3. <span style="font-family:宋体">信息披露</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">在如下情况下，</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(a) <span style="font-family:宋体">经您事先同意，向第三方披露；</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(b)<span style="font-family:宋体">为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(c) <span style="font-family:宋体">根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(d) <span style="font-family:宋体">如您出现违反中国有关法律、法规或者</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">服务协议或相关规则的情况，需要向第三方披露；</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(e) <span style="font-family:宋体">如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(f) <span style="font-family:宋体">在</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(g) <span style="font-family:宋体">其它</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">根据法律、法规或者网站政策认为合适的披露。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">4. <span style="font-family:宋体">信息存储和交换</span></span>
</p>
<p>
    <span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">收集的有关您的信息和资料将保存在</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">及（或）其关联公司的服务器上，这些信息和</span></span><span style="font-family: 宋体; font-size: 14px;">资料可能传送至您所在国家、地区或</span><span style="font-family: Calibri; font-size: 14px;"><span style="font-family:宋体">妙语</span></span><span style="font-family: 宋体; font-size: 14px;">收集信息和资料所在地的境外并在境外被访问、存储和展示。</span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">5. <span style="font-family:宋体">信息安全</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(a) </span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">帐号均有安全保护功能，请妥善保管您的用户名及密码信息。</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在</span>“完善的安全措施”。</span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">6.<span style="font-family:宋体">本隐私政策的更改</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(a)<span style="font-family:宋体">如果决定更改隐私政策，我们会在本政策中、本公司网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px">(b)<span style="font-family:宋体">本公司保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本公司会通过网站通知的形式告知。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">为防止向第三方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，</span> <span style="font-family:宋体">仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">用户名及密码发生泄露，请您立即联络</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">客服，以便</span></span><span style=";font-family:Calibri;font-size:14px"><span style="font-family:宋体">妙语</span></span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">采取相应措施。</span></span>
</p>
<p>
    <span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体"></span></span><br/>
</p>
<p>
    <br/>
</p>`;
	export default {
		data() {
			return {
				htmlStr: htmlStr,
			}
		},
		onLoad() {
			this.htmlStr = parseHtml(this.htmlStr);
		},
		methods: {
			
		}
	}
</script>

<style>
#resp {
	margin-left: 30rpx;
	margin-right: 30rpx;
}
</style>
