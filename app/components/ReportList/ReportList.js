import React from 'react';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { Asset, AppLoading } from 'expo';

class ReportList extends React.Component {
  render() {
    const report = this.props.report;
    return(
      <Card
        title={report.title}
        image={{uri: report.featureImage}}>
        <Text style={{marginBottom: 10}}>
          {report.description}
        </Text>
        <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          // fontFamily='Lato'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
      </Card>
    )
  }
}

export default ReportList;