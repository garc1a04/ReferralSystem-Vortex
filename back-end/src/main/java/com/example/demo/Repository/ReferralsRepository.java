package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.Referrals;
import com.example.demo.Entity.Users;

public interface ReferralsRepository extends JpaRepository<Referrals, Long>{
	List<Referrals> findByReferrer(Users referrer);
}