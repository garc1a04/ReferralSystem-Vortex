package com.example.demo.DTO;

public class ReferralsDTO {
	private Long userReferred;
	private Long referrer;
	
	public Long getUserReferred() {
		return userReferred;
	}
	public void setUserReferred(Long userReferred) {
		this.userReferred = userReferred;
	}
	public Long getReferrer() {
		return referrer;
	}
	public void setReferrer(Long referrer) {
		this.referrer = referrer;
	}
}