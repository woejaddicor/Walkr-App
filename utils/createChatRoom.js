// take user and recipient
// create db instance for chatroom
// push chat ref to each user

import db from "../config/Database";
import { ref, onValue, set } from "firebase/database";

function createChatRoom(userid, recipientid) {
  const chatRef = ref(db, `chat/${userid}/`);

  onValue(chatRef, (snapshot) => {
    if (!snapshot.val()) {
      set(ref(db, "chat"), {
        [userid]: {
          recipientid: "chatroomz",
        },
      });
    } else {
      onValue(chatRef, (snapshot) => {
        const chatRoomList = snapshot.val();
        chatRoomList[recipientid] = "chatroom12";
        set(ref(db, `chat/${userid}`), {
          chatRoomList
        });
      });
    }
  });

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
