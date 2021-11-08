import db from "../config/Database";
import { ref, set, get } from "firebase/database";

async function createChatRoom(userid, recipientid) {
  const chatRef = ref(db, `chat/${userid}`);
  const recipientRef = ref(db, `chat/${recipientid}`);
  get(chatRef, userid)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const chatRoomList = snapshot.val();
        const newChatRoomList = {
          ...chatRoomList,
          [recipientid]: userid + recipientid,
        };
        console.log(newChatRoomList);
        set(ref(db, `chat/`), {
          [userid]: newChatRoomList,
        });
      } else {
        if (!snapshot.exists()) {
          set(ref(db, `chat/${userid}/`), {
            [recipientid]: userid + recipientid,
          });
        }
      }
    })
    .then(() => {
      get(recipientRef, recipientid).then((snapshot) => {
        if (snapshot.exists()) {
          const chatRoomList = snapshot.val();
          const newChatRoomList = {
            ...chatRoomList,
            [userid]: userid + recipientid,
          };
          console.log(newChatRoomList);
          set(ref(db, `chat/`), {
            [recipientid]: newChatRoomList,
          });
        } else {
          if (!snapshot.exists()) {
            set(ref(db, `chat/${recipientid}/`), {
              [userid]: userid + recipientid,
            });
          }
        }
      });
    });
  return userid + recipientid;
}

export default createChatRoom;
