package com.example.demo.Services;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Entity.Referrals;
import com.example.demo.Entity.Users;
import com.example.demo.Repository.ReferralsRepository;

@Service
public class ReferralsServices {
    private final ReferralsRepository referralsRepository;

    public ReferralsServices(ReferralsRepository referralsRepository) {
        this.referralsRepository = referralsRepository;
    }
    
    public Referrals buildReferral(Users userReferred, Users referrer) {
    	if (userReferred == null || referrer == null) {
    	    throw new IllegalArgumentException("User referred and referrer must not be null");
    	}
    	
    	if (userReferred.getIdUser() == referrer.getIdUser()) {
    	    throw new IllegalArgumentException("A user cannot refer themselves");
    	}
    	
    	Referrals aux = new Referrals();
	    aux.setUserReferred(userReferred);
	    aux.setReferrer(referrer);
	    aux.setDate(LocalDateTime.now());
	    return aux;
    }
    
    public Referrals createReferral(Users userReferred, Users referrer) {    	
        return referralsRepository.save(buildReferral(userReferred, referrer));
    }
    
    public List<Referrals> getReferralsByUser(Users referrer) {
        return referralsRepository.findByReferrer(referrer);
    }
    
    public long getReferralsPoints(Users referrer) {
        return referralsRepository.findByReferrer(referrer).size();
    }
}