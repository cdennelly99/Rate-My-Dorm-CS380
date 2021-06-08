import { useContext } from "react";
import { Link } from 'react-router-dom';
import LoaderComponent from '../Components/LoaderComponent';
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import ReviewsBlockComponent from '../Components/ReviewsBlockComponent'
import ProfileStyles from "../Styles/ProfilePage.module.css"

const ProfilePage = () => {

  //Set Tab Name:
  document.title = "Profile Page";

  const user = useContext(UserContext);
  
  if (user === undefined) {
    return (
      <LoaderComponent />
    )
  } else if (user === null) {
    return (
      <Link to="/signin">
        Sign In
      </Link>
    )
  }

  const { photoURL } = user;
  
  return (
    <div className={ProfileStyles.windowDivSection}>
      
      <div className={ProfileStyles.mainSection}>
        
        <div className={ProfileStyles.userColumnSection}>

            <div className={ProfileStyles.userInfo}>
              
              <div className={ProfileStyles.userImageBox}>
              <div
                  style={{
                    background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
                    backgroundSize: "cover",
                    height: "250px",
                    width: "250px"
                  }}
                />
              </div>

              <div className={ProfileStyles.userNameBox}>
                {user.displayName}
              </div>

              <div className={ProfileStyles.userGradYearBox}>
                {user.email}
              </div>

            </div>

            <div className={ProfileStyles.userColumnSpacer}>
              User Column Spacer
            </div>

        </div>

        <div className={ProfileStyles.userReviewSection}>
          Reviews Section
        </div>

      </div>

    </div>



    // <div>
    //   <div>
    //     <div
    //       style={{
    //         background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
    //         backgroundSize: "cover",
    //         height: "200px",
    //         width: "200px"
    //       }}
    //     />
    //     <div>
    //       <h2>{displayName}</h2>
    //       <h3>{email}</h3>
    //     </div>
    //   </div>
    //   <button onClick={() => {auth.signOut()}}>Sign out</button>
    // </div>
  ) 
};

export default ProfilePage;