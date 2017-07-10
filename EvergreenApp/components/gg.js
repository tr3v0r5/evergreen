<WidgetComponent city = {this.state.city} state = {this.state.state} condition = {this.state.conditionArray[0]}
 day = {this.state.dayArray[0]} pop= {this.state.popArray[0]} temp = {this.state.tempArray[0]}
humidity = {this.state.humidityArray[0]} wind = {this.state.windArray[0]}/>

<WidgetComponent city = {this.state.city} state = {this.state.state} condition = {this.state.conditionArray[1]}
day = {this.state.dayArray[1]} pop= {this.state.popArray[1]} temp = {this.state.tempArray[1]}
humidity = {this.state.humidityArray[1]} wind = {this.state.windArray[1]}/>

<WidgetComponent city = {this.state.city} state = {this.state.state} condition = {this.state.conditionArray[2]}
day = {this.state.dayArray[2]} pop= {this.state.popArray[2]} temp = {this.state.tempArray[2]}
humidity = {this.state.humidityArray[2]} wind = {this.state.windArray[2]}/>

<WidgetComponent city = {this.state.city} state = {this.state.state} condition = {this.state.conditionArray[3]}
day = {this.state.dayArray[3]} pop= {this.state.popArray[3]} temp = {this.state.tempArray[3]}
humidity = {this.state.humidityArray[3]} wind = {this.state.windArray[3]}/>

<WidgetComponent city = {this.state.city} state = {this.state.state} condition = {this.state.conditionArray[4]}
day = {this.state.dayArray[4]} pop= {this.state.popArray[4]} temp = {this.state.tempArray[4]}
humidity = {this.state.humidityArray[4]} wind = {this.state.windArray[4]}/>



if(this.state.loaded){
  return (
    <Carousel
    sliderWidth={this.state.viewport.width}
    itemWidth={itemWidth}
    inactiveSlideScale={0.94}
    inactiveSlideOpacity={0.6}
    enableMomentum={false}
       >
    <View style = {styles.container}>
    <Text>{this.state.infoArray[0].day} </Text>
    <WidgetComponent
    city = {'m'}
    day = {this.state.infoArray[0].day}/>
    </View>
      </Carousel>
  );
}
