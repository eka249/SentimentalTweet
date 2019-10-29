import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import FavBar from "./components_searchHome/FavBar";
import NavBarOpener from "./components_sidebar/NavBarOpener";
import DropDown from "./components_searchHome/DropDown";
// import Banner from "./components/Banner"

import Favorites from "./containers/Favorites";
import Profile from "./containers/Profile";
import Statistics from "./containers/Statistics";

// import SearchBar from "./components_searchHome/SearchBar";
import ModalContainer from "./components_sidebar/ModalContainer";
import SearchHome from "./containers/SearchHome";
import twitteraccounts from "./components_favorites/TwitterAccts";
import Entered from "./HOC/Entered";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      entered: false,
      show: false,
      logged_in: true,
      // user: null,
      // navBarShow: false,
      // selectedAcc: [], //twitteraccount

      // user: {
      //   username: "tester1",
      //   name: "tester1",
      //   password: "tester1",
      //   id: 1
      // },
      // favorites: [],
      // top10: twitteraccounts
      user: {
        username: "Problem Domain",
        name: "tester1",
        password: "tester1",
        id: 1
      },
      favorites: [
        {
          name: "Barack Obama",
          twitter_account_id: "@BarackObama"
        },
        {
          name: "Katy Perry",
          twitter_account_id: "@katyperry"
        },
        {
          name: "Justin Bieber",
          twitter_account_id: "@justinbieber"
        }
      ],
      tweets: [
        {
          content:
            "Hello this is a long content because I need to test a long content for scroll so the long content overflow and doesnt change the height of the card.",
          sentiment: 0.5,
          date: "10/23/19"
        },
        { content: "Bye", sentiment: 0.3, date: "10/23/19" }
      ],
      selectedAcc: { name: "", twitterHandle: "" }, //twitteraccount
      navBarShow: false,

      top10: [
        {
          key: "Barack Obama",
          text: "Barack Obama",
          value: "@BarackObama"
        },
        {
          key: "Katy Perry",
          text: "Katy Perry",
          value: "@katyperry"
        },
        {
          key: "Justin Bieber",
          text: "Justin Bieber",
          value: "@justinbieber"
        }
      ]
    };
  }

  addToFavorites = favorite => {
    //***************
    let favoriteTweeters = this.state.favorites;

    if (!favoriteTweeters.includes(favorite)) {
      this.setState({ favorites: [...this.state.favorites, favorite] });
    } else {
      let filteredTweeters = favoriteTweeters.filter(
        unFavorite => unFavorite !== favorite
      );
      this.setState({ favorites: [...filteredTweeters] });
    }
  }; //NEED TO RENDER TO FAVORITES PAGE

  //change this to not be rendered upon sign in;
  // this function can be used for rendering favorites as well
  generateAllTweets = () => {
    fetch("http://localhost:3000/allcelebs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(resp => resp.json())
      // .then(data => console.log(data));
      .then(data => this.setState({ top10: [...data], data }));
  };

  showModal = () => {
    this.setState({
      show: !this.state.show
    });
  };

  getLoggedIn = json => {
    console.log("initiated sign in fetch");
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => {
          return { logged_in: true, user: data.user };
        });
      });
  };

  logOut = () => {
    localStorage.removeItem("token");
    this.setState(prevState => {
      return {
        logged_in: false,
        user: null
      };
    });
  };

  updateSelectedAcc = async (name, account) => {
    await this.setState({
      selectedAcc: { name: name, twitterHandle: account }
    });
  };

  deleteFav = e => {
    //********* RECEIVE ALL FAVS of USER as RETURNED DATA
    // fetch(Url + e.id {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //   }
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //   this.setData({
    //     favorites: data
    //   })
    // })
  };

  addFav = e => {
    // const user_id = this.state.user.id
    // const twitter_account_id = e.target.id
    ////////double check on the e.target.id to match twitteracc id.
    // fetch(Url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json'
    //     },
    //     body: JSON.stringify({ user_id, twitter_account_id })
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //   this.setState({
    //    favorites: [...this.state.favorites, data]
    // })})
  };

  toggleNav = () => {
    this.setState({
      navBarShow: !this.state.navBarShow
    });
  };

  signed = () => {
    return (
      <React.Fragment>
        <Menu.Item as={Link} to="/">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/favorites">
          <Icon name="heart outline" />
          Favorites
        </Menu.Item>
        <Menu.Item as={Link} to="/statistics">
          <Icon name="chart area" />
          Positivities
        </Menu.Item>
        <Menu.Item as={Link} to="/profile">
          <Icon name="user outline" />
          Profile
        </Menu.Item>
        <Menu.Item onClick={() => this.logOut()}>
          <Icon name="sign out" />
          Sign-out
        </Menu.Item>
      </React.Fragment>
    );
  };

  searchTwitter = celeb => {
    // console.log("signed in as:", this.state.user);
    // console.log("local storage token", localStorage.token);
    // console.log("began fetchtwitter on front end-should go to /celebs");
    // fetch(`http://localhost:3000/celebs`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: `Bearer ${localStorage.token}`
    //   },
    //   body: JSON.stringify({ celebrity: celeb })
    // });
    // .then(response => response.json)
    // .then(data => {
    //   this.setState({
    //     tweets: data
    //   });
    // });
  };

  toggleEnter = () => {
    this.setState({
      entered: true
    });
  };

  entered = () => {
    return (
      <React.Fragment>
        <FavBar favs={this.state.favorites} />
        <NavBarOpener toggle={this.toggleNav} />
        {/* <SearchHome tweets={this.state.tweets} name={this.state.selectedAcc.name}/> */}
        <DropDown
          // top10={this.state.top10}
          top10={this.state.top10}
          searchTwitter={this.searchTwitter}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Router>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => this.toggleNav()}
            vertical
            visible={this.state.navBarShow}
            width="thin"
          >
            {this.state.logged_in ? (
              this.signed()
            ) : (
              <Menu.Item
                onClick={this.showModal}
                // {() => this.onSignIn()}
              >
                <Icon name="sign in" />
                Sign-in
              </Menu.Item>
            )}
          </Sidebar>

          {this.state.show ? (
            <ModalContainer
              logged_in={this.state.logged_in}
              user={this.state.user}
              getLoggedIn={this.getLoggedIn}
              showModal={this.showModal}
              generateAllTweets={this.generateAllTweets}
            />
          ) : null}

          <Sidebar.Pusher dimmed={this.state.navBarShow}>
            <React.Fragment>
              <div className="App">
                <Route exact path="/">
                  {/* <Entered
                    state={this.state}
                    enter={this.toggleEnter}
                    toggle={this.toggleNav}
                    searchTwitter={this.searchTwitter}
                    updateSelectedAcc={this.updateSelectedAcc}
                  /> */}
                  <Entered
                    state={this.state}
                    Acc={this.state.selectedAcc}
                    enter={this.toggleEnter}
                    toggle={this.toggleNav}
                    searchTwitter={this.searchTwitter}
                    updateSelectedAcc={this.updateSelectedAcc}
                  />
                </Route>

                <Route exact path="/favorites">
                  <Favorites
                    top10={this.state.top10}
                    loggedin={this.state.logged_in}
                    favs={this.state.favorites}
                    user={this.state.user}
                    deleteFav={this.deleteFav}
                    toggleNav={this.toggleNav}
                    addToFavorites={this.addToFavorites}
                  />
                </Route>

                <Route exact path="/profile">
                  <Profile
                    loggedin={this.state.logged_in}
                    user={this.state.user}
                    updateUser={this.updateUser}
                    toggleNav={this.toggleNav}
                  />
                </Route>

                <Route exact path="/statistics">
                  <Statistics
                    top10={this.state.top10}
                    loggedin={this.state.logged_in}
                    toggleNav={this.toggleNav}
                    tweets={this.state.tweets}
                    selectedAcc={this.state.selectedAcc}
                    top10={this.state.top10}
                    searchTwitter={this.searchTwitter}
                    updateSelectedAcc={this.updateSelectedAcc}
                  />
                </Route>
              </div>
            </React.Fragment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    );
  }
}

export default App;
