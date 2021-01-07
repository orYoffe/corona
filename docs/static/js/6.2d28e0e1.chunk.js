(this.webpackJsonpcorona=this.webpackJsonpcorona||[]).push([[6],{473:function(e,t,a){var r=a(89),l=a(73);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a(0)),o=a(127),c=a(225),i=r(a(50)),u=l(a(128)),d=r(a(517)),s=a(611),f=a(129),m=a(224),A=n.default.lazy((function(){return Promise.all([a.e(5),a.e(9)]).then(a.t.bind(null,612,7))})),h=n.default.lazy((function(){return a.e(8).then(a.t.bind(null,622,7))})),g=(0,i.default)((function(e){var t=u.default.getState();if(e.length){var a=t.countries.filter((function(t){return t.country.toLowerCase().includes(e.toLowerCase())}));u.searchState.setState({filteredCountries:a},(function(){var e=u.searchState.getState();e.sortBy&&C(e.sortBy)}))}else u.searchState.setState({filteredCountries:t.countries})}),300),y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";u.searchState.setState({search:e}),g(e)},C=function(e){var t=m.chartList[e],a=u.searchState.getState().filteredCountries.slice().sort((function(e,a){return a[t]-e[t]}));u.searchState.setState({filteredCountries:a,sortBy:e})},E=o.StyleSheet.create({container:{alignItems:"center",width:"100%"},title:{color:f.white,fontWeight:"bold",fontSize:16},headlines:{borderBottomColor:f.white,borderBottomStyle:"solid",borderBottomWidth:1},search:{height:40,borderColor:"gray",borderWidth:1,backgroundColor:"#ccc",width:"90%",borderRadius:3,paddingLeft:8,paddingRight:8},text:{color:f.white,marginBottom:5},subText:{color:f.white,marginBottom:5,fontSize:10},country:{alignItems:"flex-start",justifyContent:"flex-start",width:"100%",marginBottom:10,borderBottomColor:f.white,borderBottomStyle:"solid",borderBottomWidth:1,backgroundColor:"darkcyan",borderRadius:3,padding:10,shadowColor:f.black,shadowOffset:{width:0,height:1},shadowOpacity:.8,shadowRadius:2,elevation:5},loader:{marginTop:40,height:400,alignSelf:"center"}}),b=(0,c.subscribe)((0,n.memo)((function(e){var t,a=e.lastUpdated,r=e.allCases,l=e.allDeaths,c=e.allRecovered,i=e.search,g=function(){var e=localStorage.getItem("f");return e&&JSON.parse(e)}();if(g&&Array.isArray(g)&&g.length){var b=u.default.getState().countries.filter((function(e){return-1!==g.indexOf(e.country)}));t=n.default.createElement(o.View,{style:{width:"90%",borderBottomColor:f.white,borderBottomStyle:"solid",borderBottomWidth:1}},n.default.createElement(o.Text,{style:[E.title,E.text,{alignItems:"center",justifyContent:"center"}]},"Quick links to your favourites countries"),n.default.createElement(s.CountriesList,{list:b}))}return n.default.createElement(o.View,{style:E.container},t,n.default.createElement(n.Suspense,{fallback:n.default.createElement(o.ActivityIndicator,{size:"large",style:E.loader})},n.default.createElement(A,null)),a&&n.default.createElement(m.Box,{style:E.headlines},n.default.createElement(o.Text,{style:[E.title,E.text]},"Worldwide"),n.default.createElement(o.Text,{key:"Total cases: ".concat(r),style:E.text},n.default.createElement(m.L,{t:"Total cases: "}),n.default.createElement(m.V,{t:r})),n.default.createElement(o.Text,{key:"Total deaths: ".concat(l),style:E.text},n.default.createElement(m.L,{t:"Total deaths: "}),n.default.createElement(m.V,{t:l})),n.default.createElement(o.Text,{key:"Total recovered: ".concat(c),style:E.text},n.default.createElement(m.L,{t:"Total recovered: "}),n.default.createElement(m.V,{t:c})),n.default.createElement(o.Text,{key:"updated on: ".concat(a.toDateString()),style:E.text},n.default.createElement(m.L,{t:"Updated on: "}),n.default.createElement(m.V,{t:a.toDateString()}))),n.default.createElement(n.Suspense,{fallback:n.default.createElement(o.ActivityIndicator,{size:"large",style:E.loader})},n.default.createElement(h,null)),n.default.createElement(o.TextInput,{style:E.search,placeholder:"Type Country Name Here...",onChangeText:y,value:i||""}),n.default.createElement(d.default,{options:m.chartList,onSelect:C,label:"Sort countries by"}),n.default.createElement(s.FilteredList,null))})),[u.default,u.searchState],(function(e,t){return{lastUpdated:e.lastUpdated,allCases:e.allCases,allDeaths:e.allDeaths,allRecovered:e.allRecovered,search:t.search}}));t.default=b},496:function(e,t,a){var r=a(73),l=a(89);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a(226)),o=r(a(0)),c=a(127),i=(0,o.memo)((function(e){var t=e.country,r=(0,o.useState)(function(e){var t=localStorage.getItem("f");return(t=t&&JSON.parse(t))&&Array.isArray(t)&&-1!==t.indexOf(e)}(t)),l=(0,n.default)(r,2),i=l[0],u=l[1];return o.default.createElement(c.TouchableHighlight,{style:{borderRadius:100,backgroundColor:i?"":"#ccc",marginBottom:10},onPress:function(e){e.preventDefault(),e.stopPropagation();var a=localStorage.getItem("f");if(a=a&&JSON.parse(a),Array.isArray(a)){var r=a.indexOf(t);-1===r?(a.push(t),u(!0)):(a.splice(r,1),u(!1))}else u(!0),a=[t];localStorage.setItem("f",JSON.stringify(a))}},o.default.createElement(c.Image,{accessibilityLabel:"Set Country as a favourite",accessibilityHint:"Set Country as a favourite",style:{height:20,width:20,marginTop:i?0:-2},source:{uri:a(497)("./".concat(i?"star":"emptyStar",".png"))}}))}));t.default=i},497:function(e,t,a){var r={"./emptyStar.png":498,"./star.png":499};function l(e){var t=n(e);return a(t)}function n(e){if(!a.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}l.keys=function(){return Object.keys(r)},l.resolve=n,e.exports=l,l.id=497},498:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAABRJJREFUeJztm2uIVkUYx397QbeLZKnY1qu7ue1aGaaC38qgL9XShhRUVF8UgvpUEXaTCgUpu1BkJdpt18ouBEaQQUQfulCikZSluZFpSSFByNpue3G3D8857btzZuadc5kzC+0PHlzOOzPP/5lzzpxnLsIUU0wRkAsj+9+yHXgjtIhQLAROAiNAR2AtQXgNGIusJ7CW0mlH7nzcASNAW1BFJdPNePCxvRJSUJksAIZJdsAw0BpOVnm8TDL42LYG1FUKrcAQ5g4YAuaHElcGWzAHH9vmYOo8Mx8YpHYHDAKVQBq98gLJYP+JTL2+KZBGb1TQ3/3n0XfMANAcRKknNqF/1Ochr4ZuYHw6iFIPNCN31PbJe0nzez8wt1SlnngGfdJzXlUZU3L0ZKlKPXA2cifVwF7VlO3RlDsBzClFqSeeIhnUCDIZUomnx2r5x0pR6oE5wN8kA3rdUudNTfk+YJZXpZ7YSDKYk8AFljqLgFFNvQ2+RNYV0EYjMqC1K7YCaFLKvgPcWKO9d4HrlWsDwKdAr2K/IK9UZlw7oB5oIRlkBzLBaXRoYwxYDOyrUW4J8I2jrmGkE9SO6QUOI0+TlTrl73kkg2xHPlPTHEWZ2AFc51j2faArp78h4Gf0nfMrckMAeAi5K7pkpUhbmkL8cs9a+oHvotiZCezy5GgUeRSfSxF8zGbgCPpBsQj7CpgZvwIzgJ3ApRmEAvwJHNTYT8iTlYdTGB9vVMv6efwc6AT6qseA05B37wpLxR+Bb6N/qwP9K6OQvJxFslMuwb7P8AlwLZKjJGgCPsT82HwJnFGMdi+cCezGrH8nyU9zgmnAe5ZG9iA9P9mYjXw+Tbp3kOJL1gi8bWlsL5NrkjIXGdVNet/CLVeZQAOwzdLoPibHfL0Z2I9ZZw8SSybqkYULU+MHgHOya89NBRmETfq2UkC6X4d+SSu2XiSDLJtWJNMz6XqWYuY6//G4xdkhyt3WakMSLJOejb4cr7c4PQKc78txFQuB3yw61vkW8KDF+VHs8/28LAJ+t/h/wKPvCdxtEfFHJLRoFgPHLH7v8uDTyh2YJyrrPfh71OBrFLjdgz8nVhtE3eDB160GX6s8+HKmYhB1kQdfSw2+zs3TaH1OUbp3fQjJDYrmAPolrlzjjY8OOIis1RXNAJL4uGhwxkcH1Fr0zMMPjhqc8dEB3+ds04au7WAdUId+sEvzBFwNXJmivK4DfAy4TrSgH5V1+34qlyPrcnGdj4FlDvWWGHyGmIzRqRHSj/2pWg58pKkXJzTbmbhtrtKEfgP1qhxxZGaNRsjXhrIXI0tSpjS22gaRMwWzDW31aurckzuaDHRrhGxTyrQhx+F1d62WHQfWAqcqberWK4Mcs92jEXJv9FsFWY3RnfpIa0eB2xhf1tqgKbPLW5QG6tDv/a9CDjfpjr7pbD/29Ty17ErgZs1vfRS8+lOLBQaRI4brqh1GOqshstXIgopL3UOG6y1eI1bochSr2jHgTmC6ps3pyJzeNue3WWfhUVq4P6W448hO7OkObc8AHo7qpPGxppDIHKn+7y42GwCeINsm5izkkJXrtn131mCyYNuCGkNG/y3knKtHVIAXqT2+7C7AlxMNmO/KKHLSyyUdTksHsl1nWoY7QUlfgnaDgA+QXN03yzDvYNvS6MJYqTj9DLisDMcKK4AvFC3XlOF4beRsLyV/egx0IYc2xoD7ynC4DriJkjOvGtQDtwCPpK34L9lXPAcibrewAAAAAElFTkSuQmCC"},499:function(e,t){e.exports="data:image/png;base64,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"},517:function(e,t,a){var r=a(73);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=r(a(0)),n=a(127),o={color:a(129).white,alignSelf:"center",marginTop:10,marginBottom:10},c=(0,l.memo)((function(e){var t=e.onSelect,a=e.label,r=e.options;return l.default.createElement(n.View,{className:"select"},l.default.createElement("label",{style:o},a,":"),l.default.createElement("select",{onChange:function(e){t(e.currentTarget.value)}},Object.keys(r).map((function(e){return l.default.createElement("option",{key:"dropdownItem_".concat(e),value:e},e)}))))}));t.default=c},611:function(e,t,a){var r=a(89),l=a(73);Object.defineProperty(t,"__esModule",{value:!0}),t.FilteredList=t.CountriesList=void 0;var n=l(a(0)),o=a(127),c=a(227),i=a(225),u=a(128),d=r(a(496)),s=a(129),f=a(224),m=(0,n.memo)((function(e){var t=e.list;return t?t.length<1?n.default.createElement(o.Text,{style:[A.title,A.text]},"No counteries were found.. try another search term"):t.map((function(e){var t=e.country,a=e.confirmed,r=e.deaths,l=e.recovered,i=e.population,u=e.precentage,s=e.active;return n.default.createElement(c.Link,{to:"country/".concat(t),key:"country/".concat(t),onClick:function(e){"IMG"===e.target.tagName&&e.preventDefault()}},n.default.createElement(o.View,{style:A.country},n.default.createElement(o.View,{style:A.innerContainer},n.default.createElement(o.View,null,n.default.createElement(o.Text,{style:[A.title,A.text]},t),n.default.createElement(o.Text,{style:A.text},n.default.createElement(f.L,{t:"Cases:"})," ",n.default.createElement(f.V,{t:(0,f.numberWithCommas)(a)})),n.default.createElement(o.Text,{style:A.subText},n.default.createElement(f.L,{t:"Active: "}),n.default.createElement(f.V,{t:(0,f.numberWithCommas)(s)})),n.default.createElement(o.Text,{style:A.subText},n.default.createElement(f.L,{t:"Deaths: "}),n.default.createElement(f.V,{t:(0,f.numberWithCommas)(r)})),n.default.createElement(o.Text,{style:A.subText},n.default.createElement(f.L,{t:"Recovered: "}),n.default.createElement(f.V,{t:(0,f.numberWithCommas)(l)})),!!i&&n.default.createElement(o.Text,{style:A.subText},n.default.createElement(f.L,{t:"Population: "}),n.default.createElement(f.V,{t:(0,f.numberWithCommas)(i)})),!!u&&n.default.createElement(o.Text,{style:A.subText},n.default.createElement(f.L,{t:"Population infected: "}),n.default.createElement(f.V,{t:u+"%"}))),n.default.createElement(o.View,null,n.default.createElement(d.default,{country:t}))),n.default.createElement(o.Text,{style:A.link},"See country stats")))})):n.default.createElement(o.ActivityIndicator,{size:"large",style:{marginTop:40,alignSelf:"center"}})}));t.CountriesList=m;var A=o.StyleSheet.create({container:{alignItems:"center",width:"100%"},innerContainer:{flexDirection:"row",justifyContent:"space-between",width:"100%"},title:{color:s.white,fontWeight:"bold",fontSize:16},text:{color:s.white,marginBottom:5},subText:{color:s.white,marginBottom:5,fontSize:10},country:{alignItems:"flex-start",justifyContent:"flex-start",width:"100%",marginBottom:10,borderBottomColor:s.white,borderBottomStyle:"solid",borderBottomWidth:1,backgroundColor:"darkcyan",borderRadius:3,padding:10,shadowColor:s.black,shadowOffset:{width:0,height:1},shadowOpacity:.8,shadowRadius:2,elevation:5},link:{alignSelf:"flex-end",color:s.white,padding:10,width:"100%",backgroundColor:"#00429d",lineHeight:35,borderRadius:3,textAlign:"center",shadowColor:s.black,shadowOffset:{width:0,height:1},shadowOpacity:.8,shadowRadius:2,elevation:5}}),h=(0,i.subscribe)((function(e){var t=e.list;return n.default.createElement(f.Box,null,n.default.createElement(m,{list:t}))}),u.searchState,(function(e){return{list:e.filteredCountries}}));t.FilteredList=h}}]);
//# sourceMappingURL=6.2d28e0e1.chunk.js.map