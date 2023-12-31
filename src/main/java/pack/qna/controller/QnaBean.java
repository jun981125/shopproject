package pack.qna.controller;

import java.time.LocalDate;

import lombok.Data;

@Data
public class QnaBean {
	private int num, readcnt, gnum, onum, nested;
	private String id, title, cont, bdate,name,filename;
	private String searchName, searchValue;
	
	public void setBdate() {
		LocalDate localDate = LocalDate.now();
		int year = localDate.getYear();
		int month = localDate.getMonthValue();
		int day = localDate.getDayOfMonth();
		this.bdate = year + "-" + month + "-" + day;	
	}
}
