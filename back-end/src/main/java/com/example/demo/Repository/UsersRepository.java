package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
	Optional<Users> findById(Long id);
	Optional<Users> findByEmailAndPassword(String email, String password);
    Optional<Users> findByEmail(String email);
    Optional<Users> findByReferralCode(String referralCode);
}