import React, {memo, Suspense} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
const Country = React.lazy(() => import('./Country'));
const Home = React.lazy(() => import('./Home'));

const App = () => {
  return (
    <Router basename="/corona">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Text
            accessibilityRole="link"
            target="_blank"
            href="https://github.com/CSSEGISandData/COVID-19"
            style={[
              styles.title,
              {
                color: '#aaa',
                padding: 10,
                width: '100%',
                textAlign: 'center',
              },
            ]}>
            COVID-19 data provided by Johns Hopkins CSSE
          </Text>
          <Suspense
            fallback={
              <ActivityIndicator
                size="large"
                style={{
                  marginTop: 40,
                  alignSelf: 'center',
                }}
              />
            }>
            <Switch>
              <Route path="/country/:country">
                <Country />
              </Route>
              <Route path="/">
                <Home />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </View>
      </ScrollView>
    </Router>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222222',
    alignItems: 'center',
    minHeight: '100%',
    width: '100%',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default memo(App);
