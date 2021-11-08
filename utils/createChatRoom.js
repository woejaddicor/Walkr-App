// take user and recipient
// create db instance for chatroom
// push chat ref to each user


import db from "../config/Database";
import Firebase from "../config/Firebase";
import { ref, onValue, set, getDatabase, get } from "firebase/database";

async function createChatRoom(userid, recipientid) {
  const chatRef = ref(db, `chat/$userid`)
    
    get(chatRef, userid).then((snapshot) => {
      console.log(snapshot.exists())
      if (!snapshot.exists()) {
        set(ref(db, `chat/${userid}/`), {
            key: "value"
          },
        )
      }

    })
    // if (!snapshot.val()) {
    
    // } else {
    //     const chatRoomList = snapshot.val();
    //     console.log(chatRoomList)
    //     const newChatRoomList = {...chatRoomList, recipientid: "chatroom101"}
    //     console.log (newChatRoomList)
    //     push(ref(db, `chat/${userid}`), {
    //       overwrite : "twice"
    //     });
    
    // }


//   const recipRef = ref(db, `chat/${recipientid}`);
//   onValue(recipRef, (snapshot) => {
//     if (!snapshot.val()) {
//       set(ref(db, "chat"), {
//         [recipientid]: {
//           [userid]: "chatroom57",
//         },
//       });
//     } else {
//         onValue(recipRef, (snapshot) => {
//             const chatRoomList = snapshot.val();
//             chatRoomList[userid] = "chatroom12";
//             set(ref(db, "chat"), {
//               [recipientid]: chatRoomList,
//             });
//           });
//     }
//   });
}

export default createChatRoom;
