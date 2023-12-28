import Friends from "../components/Friends";

export default function FriendPage({ myFriends }) {
  return (
    <div>
      <Friends myFriends={myFriends} />
    </div>
  );
}
