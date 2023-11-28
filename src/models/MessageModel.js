import mongoose, {Schema} from "mongoose";

const messsageSchema = new Schema(
    {
        sender:{},//
        receiver:{}, //
        messageContent:{type: String},
        sentTime:{},// DateTime
        receivedTime:{}// DateTime

    }
)

const collectionName = "Message"
const Message = mongoose.model("Message", messsageSchema , collectionName);
export default Message