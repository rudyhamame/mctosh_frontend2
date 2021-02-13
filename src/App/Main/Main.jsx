import React from "react";
import Posts from "./Posts/Posts";
import Friends from "./Friends/Friends";
import Aside from "./Friends/AddFriend/AddFriend";

const Main = (props) => {
  return (
    <main id="Main_article" className="fr">
      <Posts state={props.state} />
      <Friends
        state={props.state}
        searchUsers={props.searchUsers}
        addFriend={props.addFriend}
      />
    </main>
  );
};

export default Main;
