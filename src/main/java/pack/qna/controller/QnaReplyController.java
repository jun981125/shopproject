package pack.qna.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import pack.noticeboard.controller.UploadFile;
import pack.qna.model.QnaDaoImpl;

@Controller
public class QnaReplyController {
	@Autowired
	private QnaDaoImpl daoImpl;

	@GetMapping("qreply")
	public String reply(@RequestParam("num") String num, @RequestParam("page") String page,
			Model model, HttpSession session) {
		String loginId = (String) session.getAttribute("loginid");
		String nickname = (String) session.getAttribute("nickname");
		model.addAttribute("customerid", loginId);
		model.addAttribute("nickname", nickname);
		model.addAttribute("data", daoImpl.detail(num));
		model.addAttribute("page", page);
		return "qna/qreply";
	}

	@PostMapping("qreply")
	public String replyProcess(QnaBean bean, @RequestParam("page") String page, UploadFile uploadfile,
			BindingResult result, HttpSession session) {
		// 업로드 파일 초기화
		InputStream inputStream = null;
		OutputStream outputStream = null;

		// 업로드될 파일 검사
		MultipartFile file = uploadfile.getFile();

		if (result.hasErrors()) {
			return "err"; // 에러 발생 (파일을 선택하지 않은 경우)시 수행
		}

		if (file != null && !file.isEmpty()) {
			String uuid = UUID.randomUUID().toString();
			String filename = uuid + file.getOriginalFilename();

			try {
				inputStream = file.getInputStream();
				File newFile = new File(
						"/Users/heojunho/work/shop/shop/broccoli/src/main/resources/static/upload/"
								+ filename); // 절대경로로 찍기
				if (!newFile.exists()) {
					newFile.createNewFile();
				}
				outputStream = new FileOutputStream(newFile);
				int read = 0;
				byte[] bytes = new byte[1024];
				// -1 끝을 의미
				while ((read = inputStream.read(bytes)) != -1) {
					outputStream.write(bytes, 0, read); // 업로드된 파일의 데이터가 읽혀서 새로운 파일(newFile)에 저장되는 과정
				}
				bean.setFilename(filename); // 파일명 bean에 저장
			} catch (Exception e) {
				System.out.println("file submit err : " + e);
				return "err";
			} finally {
				try {
					inputStream.close();
					outputStream.close();
				} catch (Exception e2) {
				}
			}
			// 파일 업로드 과정 끝
		}

		// onum 갱신
		bean.setOnum(bean.getOnum() + 1);
		daoImpl.updateOnum(bean);

		String id = (String) session.getAttribute("loginid");
		String name = (String) session.getAttribute("nickname");
		bean.setName(name);
		bean.setId(id);
		// 답글 저장
		bean.setBdate();
		bean.setNum(daoImpl.currentNum() + 1);
		bean.setNested(bean.getNested() + 1);

		if (daoImpl.insertReply(bean)) {
			return "redirect:qlist?page=" + page;
		} else {
			return "redirect:error";
		}
	}
}
