package pack.order.model;

import lombok.Data;

@Data
public class OrderDto {
	private int orderid ,productid;
	private String customerid, orderdate, quantity, ordertotalprice, orderstate, 
	pimage, model, brand, category;
	private int subtotal, ordercount;
}
