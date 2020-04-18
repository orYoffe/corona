(this.webpackJsonpcorona=this.webpackJsonpcorona||[]).push([[7],{478:function(e,t,a){var l=a(89),r=a(88);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(0)),o=a(127),d=a(227),c=a(228),u=l(a(226)),i=l(a(610)),f=a(225),s=n.default.lazy((function(){return Promise.all([a.e(5),a.e(8)]).then(a.t.bind(null,611,7))})),m=n.default.lazy((function(){return Promise.all([a.e(0),a.e(1)]).then(a.t.bind(null,486,7))})),h=n.default.lazy((function(){return Promise.all([a.e(0),a.e(1)]).then(a.t.bind(null,486,7)).then((function(e){return{default:e.LineChart}}))})),y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";u.default.setState({search:e});var t=u.default.getState();if(e.length){var a=t.countries.filter((function(t){return t.country.toLowerCase().includes(e.toLowerCase())}));u.default.setState({filteredCountries:a},(function(){t.sortBy&&g(t.sortBy)}))}else u.default.setState({filteredCountries:t.countries})},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"confirmed",t=(0,f.generateBarData)(u.default.getState().countries.slice(0),f.chartList[e]);u.default.setState({chartData:t})},g=function(e){var t=f.chartList[e],a=u.default.getState().filteredCountries.slice().sort((function(e,a){return a[t]-e[t]}));u.default.setState({filteredCountries:a,sortBy:e})},b=o.StyleSheet.create({container:{alignItems:"center",width:"100%"},title:{color:"#fff",fontWeight:"bold",fontSize:16},text:{color:"#fff",marginBottom:5},country:{alignItems:"flex-start",justifyContent:"flex-start",width:"100%",marginBottom:10,borderBottomColor:"#fff",borderBottomStyle:"solid",borderBottomWidth:1,backgroundColor:"darkcyan",borderRadius:3,padding:10,shadowColor:"#000",shadowOffset:{width:0,height:1},shadowOpacity:.8,shadowRadius:2,elevation:5}}),p=(0,d.subscribe)((0,n.memo)((function(e){var t=e.lastUpdated,a=e.lineChartData,l=e.allCases,r=e.allDeaths,d=e.allRecovered,u=e.filteredCountries,p=e.search,x=e.chartData;return n.default.createElement(o.View,{style:b.container},n.default.createElement(n.Suspense,{fallback:""},n.default.createElement(s,null)),t&&n.default.createElement(f.Box,{style:{borderBottomColor:"#fff",borderBottomStyle:"solid",borderBottomWidth:1}},n.default.createElement(o.Text,{style:[b.title,b.text]},"Worldwide"),n.default.createElement(o.Text,{key:"Total cases: ".concat(l),style:b.text},n.default.createElement(f.L,{t:"Total cases: "}),n.default.createElement(f.V,{t:l})),n.default.createElement(o.Text,{key:"Total deaths: ".concat(r),style:b.text},n.default.createElement(f.L,{t:"Total deaths: "}),n.default.createElement(f.V,{t:r})),n.default.createElement(o.Text,{key:"Total recovered: ".concat(d),style:b.text},n.default.createElement(f.L,{t:"Total recovered: "}),n.default.createElement(f.V,{t:d})),n.default.createElement(o.Text,{key:"updated on: ".concat(t.toDateString()),style:b.text},n.default.createElement(f.L,{t:"Updated on: "}),n.default.createElement(f.V,{t:t.toDateString()}))),n.default.createElement(o.View,{style:{width:"80%",marginBottom:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}},n.default.createElement(i.default,{options:f.chartList,onSelect:E,label:"Select chart data"}),x&&n.default.createElement(n.Suspense,{fallback:n.default.createElement(o.ActivityIndicator,{size:"large",style:{marginTop:40,alignSelf:"center"}})},n.default.createElement(m,{data:x})),a&&n.default.createElement(n.Suspense,{fallback:""},n.default.createElement(h,{data:a,legend:!0}))),n.default.createElement(o.TextInput,{style:{height:40,borderColor:"gray",borderWidth:1,backgroundColor:"#ccc",width:"80%",borderRadius:3,paddingLeft:8,paddingRight:8},placeholder:"Type Country Name Here...",onChangeText:y,value:p||""}),n.default.createElement(i.default,{options:f.chartList,onSelect:g,label:"Sort countries by"}),n.default.createElement(f.Box,null,u.length<1?n.default.createElement(o.Text,{style:[b.title,b.text]},"No counteries were found.. try another search term"):u.map((function(e,t){var a=e.country,l=e.confirmed,r=e.deaths,d=e.recovered,u=e.population,i=e.precentage,s=e.active;return n.default.createElement(c.Link,{to:"country/".concat(a),key:t},n.default.createElement(o.View,{style:b.country},n.default.createElement(o.View,null,n.default.createElement(o.Text,{style:[b.title,b.text]},a),n.default.createElement(o.Text,{style:b.text},n.default.createElement(f.L,{t:"Cases:"})," ",n.default.createElement(f.V,{t:(0,f.numberWithCommas)(l)})),n.default.createElement(o.Text,{style:b.text},n.default.createElement(f.L,{t:"Active: "}),n.default.createElement(f.V,{t:(0,f.numberWithCommas)(s)})),n.default.createElement(o.Text,{style:b.text},n.default.createElement(f.L,{t:"Deaths: "}),n.default.createElement(f.V,{t:(0,f.numberWithCommas)(r)})),n.default.createElement(o.Text,{style:b.text},n.default.createElement(f.L,{t:"Recovered: "}),n.default.createElement(f.V,{t:(0,f.numberWithCommas)(d)})),!!u&&n.default.createElement(o.Text,{style:b.text},n.default.createElement(f.L,{t:"Population: "}),n.default.createElement(f.V,{t:(0,f.numberWithCommas)(u)})),!!i&&n.default.createElement(o.Text,{style:b.text},n.default.createElement(f.L,{t:"Population infected: "}),n.default.createElement(f.V,{t:i+"%"}))),n.default.createElement(o.Text,{style:[{alignSelf:"flex-end",color:"#fff",padding:10,width:"100%",backgroundColor:"#00429d",lineHeight:35,borderRadius:3,textAlign:"center",shadowColor:"#000",shadowOffset:{width:0,height:1},shadowOpacity:.8,shadowRadius:2,elevation:5}]},"See country stats")))}))))})),u.default,(function(e){return{lastUpdated:e.lastUpdated,lineChartData:e.lineChartData,allCases:e.allCases,allDeaths:e.allDeaths,allRecovered:e.allRecovered,filteredCountries:e.filteredCountries,search:e.search,chartData:e.chartData}}));t.default=p},610:function(e,t,a){var l=a(88);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(a(0)),n=a(127),o={color:"#fff",alignSelf:"center",marginTop:10,marginBottom:10},d=(0,r.memo)((function(e){var t=e.onSelect,a=e.label,l=e.options;return r.default.createElement(n.View,{className:"select"},r.default.createElement("label",{style:o},a,":"),r.default.createElement("select",{onChange:function(e){t(e.currentTarget.value)}},Object.keys(l).map((function(e){return r.default.createElement("option",{key:"dropdownItem_".concat(e),value:e},e)}))))}));t.default=d}}]);
//# sourceMappingURL=7.5ce60569.chunk.js.map