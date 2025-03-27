import { Message } from "../message/message.entity";

export interface ServertoClientEvents{
    newMessage:(payload:Message) => void;
}