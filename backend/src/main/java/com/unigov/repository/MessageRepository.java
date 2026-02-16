package com.unigov.repository;

import com.unigov.entity.Message;
import com.unigov.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    // Find all messages between two specific users (conversation history)
    @Query("SELECT m FROM Message m WHERE (m.sender = :u1 AND m.recipient = :u2) OR (m.sender = :u2 AND m.recipient = :u1) ORDER BY m.timestamp ASC")
    List<Message> findConversation(@Param("u1") User u1, @Param("u2") User u2);

    // Find all unique users a specific user has exchanged messages with
    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.recipient = :user " +
            "UNION " +
            "SELECT DISTINCT m.recipient FROM Message m WHERE m.sender = :user")
    List<User> findUsersInConversationWith(@Param("user") User user);

    // Count unread messages for a specific recipient from a specific sender
    long countByRecipientAndSenderAndIsReadFalse(User recipient, User sender);

    // Total unread messages for a recipient
    long countByRecipientAndIsReadFalse(User recipient);
}
