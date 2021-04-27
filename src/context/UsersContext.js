import createDataContext from "./createDataContext";
import firebase from "firebase";

const userReducer = (state, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "USER_POSTS":
      return { ...state, userPosts: action.payload };
    case "USER_FOLLOWING":
      return { ...state, userFollowing: action.payload };
    case "USERS_DATA":
      return { ...state, usersData: [...state.usersData, action.payload] };
    case "USERS_POSTS":
      return {
        ...state,
        usersLoaded: state.usersLoaded + 1,
        usersPosts: state.usersPosts.map((user) =>
          user.uid === action.payload.uid
            ? { ...user, posts: action.payload.posts }
            : user
        ),
      };
    default:
      return state;
  }
};

const fetchCurrentUser = (dispatch) => {
  return () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: "CURRENT_USER", payload: snapshot.data() });
        } else {
          console.log("Does not exist!");
        }
      });
  };
};

const fetchUserPosts = (dispatch) => {
  return () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {
            id,
            ...data,
          };
        });

        dispatch({ type: "USER_POSTS", payload: posts });
      });
  };
};

const fetchUserFollowing = (dispatch, getState) => {
  return () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")

      .onSnapshot((snapshot) => {
        console.log(getState.userFollowing);
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });

        dispatch({ type: "USER_FOLLOWING", payload: following });

        for (let i = 0; i < following.length; i++) {
          fetchUsersData(dispatch)(following[i], getState);
        }
      });
  };
};

const fetchUsersData = (dispatch) => {
  return (uid, getState) => {
    const found = getState.usersData.some((el) => el.uid === uid);

    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;

            dispatch({ type: "USERS_DATA", payload: user });
            fetchUsersFollowingPosts(dispatch)(user.uid, getState);
          } else {
            console.log("Does not exist!");
          }
        });
    }
  };
};

const fetchUsersFollowingPosts = (dispatch) => {
  return (uid, getState) => {
    // console.log(JSON.stringify(state, null, 4));
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        // console.log(
        //   JSON.stringify(
        //     snapshot.query._delegate._query.path.segments[1],
        //     null,
        //     4
        //   )
        // );
        if (snapshot) {
          const uid = snapshot.query._delegate._query.path.segments[1];

          const user = getState.usersData.find((el) => el.uid === uid);
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {
              id,
              ...data,
              user,
            };
          });

          dispatch({ type: "USERS_POSTS", payload: { posts, uid } });

          console.log(getState.usersPosts);
        }
      });
  };
};

export const { Context, Provider } = createDataContext(
  userReducer,
  {
    fetchCurrentUser,
    fetchUserPosts,
    fetchUserFollowing,
    fetchUsersData,
    fetchUsersFollowingPosts,
  },
  {
    currentUser: null,
    userPosts: [],
    userFollowing: [],
    usersData: [],
    usersLoaded: 0,
    usersPosts: [],
  }
);
