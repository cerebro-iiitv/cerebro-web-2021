import React from "react";
import "../../../Components/Home/Sponsors/Sponsors.scss";

const Sponsors=()=>{

  return(
    <div className="sponsors">
      <div className="sponsors__title-sponsors">
        <div className="sponsors__heading">
          <span>TITLE SPONSOR</span>
        </div>
        <div className="sponsors__body">
          <div className="sponsors__ellipse__yellow"></div>
          <div className="sponsors__content">
            <img className="sponsors__title-sponsors__logo" src="media/HAPRAMP@3x.png" alt="Hapramp logo"/>
          </div>
          <div className="sponsors__roundrect__green"></div>
          <div className="sponsors__ellipse__pink"></div>
        </div>
      </div>
      <div className="sponsors__others">
        <div className="sponsors__associate-sponsors">
          <div className="sponsors__heading">
            <span>ASSOCIATE SPONSOR</span>
          </div>
          <div className="sponsors__body">
            <div className="sponsors__ellipse__yellow"></div>
            <div className="sponsors__content">
              <img className="sponsors__associate-sponsors__logo" src="media/Group@3x.png" alt="Endeavor logo"/>
            </div>
            <div className="sponsors__roundrect__green"></div>
            <div className="sponsors__ellipse__pink"></div>
          </div>
        </div>

        <div className="sponsors__platform-partner">
          <div className="sponsors__heading">
            <span>PLATFORM PARTNER</span>
          </div>
          <div className="sponsors__body">
            <div className="sponsors__ellipse__yellow"></div>
            <div className="sponsors__content">
              <img className="sponsors__platform-partner__logo" src="media/Layer 3@3x.png" alt="GitHub logo"/>
            </div>
            <div className="sponsors__roundrect__green"></div>
            <div className="sponsors__ellipse__pink"></div>
          </div>
        </div>
      </div>


    </div>
  );

}

export default Sponsors;















// return (
//   <div className="sponsor_container">
//     <div className="sponsor_text_container">
//       <div className="hr-container">
//         <div className="hr-txt__line1">
//           <hr color="#29abe2" />
//         </div>
//         <div className="hr-txt2">
//           <hr color="#29abe2" />
//         </div>
//       </div>
//       <div className="sponsors_text">SPONSORS</div>
//       <div className="hr-container">
//         <div className="hr-txt">
//           <hr color="#29abe2" />
//         </div>
//         <div className="hr-txt2">
//           <hr color="#29abe2" />
//         </div>
//       </div>
//     </div>
//     <div class="sponsor_wrapper">
//       <img
//         src="media/portronics.png"
//         className="sponsor_img"
//         alt="sponsor One"
//       />
//       <img
//         src="media/career-launcher.png"
//         className="sponsor_img__img2"
//         alt="sponsor Two"
//       />
//       <img
//         src="media/stickermuletransparent.png"
//         className="sponsor_img"
//         alt="sponsor Three"
//       />
//       <img
//         src="media/codechef.png"
//         className="sponsor_img__img2"
//         alt="sponsor Four"
//       />
//       <img className="sponsor_none"/>
//       <img
//         src="media/HE_logo.png"
//         className="sponsor_img"
//         alt="sponsor Five"
//       />
//       <img
//         src="media/souledstoretransparent.png"
//         className="sponsor_img__img2"
//         alt="sponsor Six"
//       />
//     </div>
//   </div>
// );