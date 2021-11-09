import db from "../config/Database";
import { ref, set, get } from "firebase/database";

function createChatRoom(userid, recipientid, username, recipientName) {
  const chatRef = ref(db, `chat/${userid}/mychats`);
  const recipientRef = ref(db, `chat/${recipientid}/mychats`);
  get(chatRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const chatRoomList = snapshot.val();
        chatRoomList[recipientName] = userid + recipientid;
        set(ref(db, `chat/${userid}`), {
          mychats: chatRoomList,
        });
      } else {
        if (!snapshot.exists()) {
          set(ref(db, `chat/${userid}`), {
            mychats: {
              [recipientName]: `${userid}${recipientid}`,
            },
          });
        }
      }
    })
    .then(() => {
      get(recipientRef).then((snapshot) => {
        if (snapshot.exists()) {
          const chatRoomList = snapshot.val();
          chatRoomList[username] = userid + recipientid;
          set(ref(db, `chat/${recipientid}`), {
            mychats: chatRoomList,
          });
        } else {
          if (!snapshot.exists()) {
            set(ref(db, `chat/${recipientid}/`), {
              mychats: {
                [username]: userid + recipientid,
              },
            });
          }
        }
      });
    });
  return userid + recipientid;
}

export default createChatRoom;
