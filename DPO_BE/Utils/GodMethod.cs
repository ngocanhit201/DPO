﻿using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace DPO.Utils
{
	public static class GodMethod
	{
		public static string GenerateSlug(string str, bool hierarchical = true)
		{
			var slug = str.Trim().ToLower();

			string[] decomposed = new string[] { "à","á","ạ","ả","ã","â","ầ","ấ","ậ","ẩ","ẫ","ă",
													   "ằ","ắ","ặ","ẳ","ẵ","è","é","ẹ","ẻ","ẽ","ê","ề" ,
													   "ế","ệ","ể","ễ", "ì","í","ị","ỉ","ĩ", "ò","ó","ọ",
													   "ỏ","õ","ô","ồ","ố","ộ","ổ","ỗ","ơ" ,"ò","ớ","ợ","ở",
													   "õ", "ù","ú","ụ","ủ","ũ","ư","ừ","ứ","ự","ử","ữ",
													   "ỳ","ý","ỵ","ỷ","ỹ", "đ",
													   "À","À","Ạ","Ả","Ã","Â","Ầ","Ấ","Ậ","Ẩ","Ẫ","Ă" ,
													   "Ằ","Ắ","Ặ","Ẳ","Ẵ", "È","É","Ẹ","Ẻ","Ẽ","Ê","Ề",
													   "Ế","Ệ","Ể","Ễ", "Ì","Í","Ị","Ỉ","Ĩ", "Ò","Ó","Ọ","Ỏ",
													   "Õ","Ô","Ồ","Ố","Ộ","Ổ","Ỗ","Ơ" ,"Ờ","Ớ","Ợ","Ở","Ỡ",
													   "Ù","Ú","Ụ","Ủ","Ũ","Ư","Ừ","Ứ","Ự","Ử","Ữ", "Ỳ","Ý","Ỵ",
													   "Ỷ","Ỹ", "Đ"};
			string[] precomposed =  {  "à","á","ạ","ả","ã","â","ầ","ấ","ậ","ẩ","ẫ","ă",
											 "ằ","ắ","ặ","ẳ","ẵ","è","é","ẹ","ẻ","ẽ","ê","ề" ,
											 "ế","ệ","ể","ễ", "ì","í","ị","ỉ","ĩ", "ò","ó","ọ","ỏ",
											 "õ","ô","ồ","ố","ộ","ổ","ỗ","ơ" ,"ờ","ớ","ợ","ở","ỡ", "ù",
											 "ú","ụ","ủ","ũ","ư","ừ","ứ","ự","ử","ữ", "ỳ","ý","ỵ","ỷ","ỹ",
											 "đ", "À","Á","Ạ","Ả","Ã","Â","Ầ","Ấ","Ậ","Ẩ","Ẫ","Ă" ,"Ằ","Ắ",
											 "Ặ","Ẳ","Ẵ", "È","É","Ẹ","Ẻ","Ẽ","Ê","Ề","Ế","Ệ","Ể","Ễ", "Ì",
											 "Í","Ị","Ỉ","Ĩ", "Ò","Ó","Ọ","Ỏ","Õ","Ô","Ồ","Ố","Ộ","Ổ","Ỗ",
											 "Ơ" ,"Ờ","Ớ","Ợ","Ở","Ỡ", "Ù","Ú","Ụ","Ủ","Ũ","Ư","Ừ","Ứ","Ự",
											 "Ử","Ữ", "Ỳ","Ý","Ỵ","Ỷ","Ỹ", "Đ"};
			string[] latin =  { "a","a","a","a","a","a","a","a","a","a","a" ,
								   "a","a","a","a","a","a", "e","e","e","e","e",
								   "e","e","e","e","e","e", "i","i","i","i","i", "o",
								   "o","o","o","o","o","o","o","o","o","o","o" ,"o","o","o","o","o",
								   "u","u","u","u","u","u","u","u","u","u","u", "y","y","y","y","y", "d",
								   "a","a","a","a","a","a","a","a","a","a","a","a" ,"a","a","a","a","a",
								   "e","e","e","e","e","e","e","e","e","e","e", "i","i","i","i","i", "o",
								   "o","o","o","o","o","o","o","o","o","o","o" ,"o","o","o","o","o", "u",
								   "u","u","u","u","u","u","u","u","u","u", "y","y","y","y","y", "d"};

			// Convert culture specific characters
			for (int i = 0; i < decomposed.Length; i++)
			{
				slug = slug.Replace(decomposed[i], latin[i]);
				slug = slug.Replace(precomposed[i], latin[i]);
			}

			// Remove special characters
			slug = Regex.Replace(slug, @"[^a-z0-9-/ ]", "").Replace("--", "-");

			// Remove whitespaces
			slug = Regex.Replace(slug.Replace("-", " "), @"\s+", " ").Replace(" ", "-");

			// Remove slash if non-hierarchical
			if (!hierarchical)
				slug = slug.Replace("/", "-");

			// Remove multiple dashes
			slug = Regex.Replace(slug, @"[-]+", "-");

			// Remove leading & trailing dashes
			if (slug.EndsWith("-"))
				slug = slug.Substring(0, slug.LastIndexOf("-"));
			if (slug.StartsWith("-"))
				slug = slug.Substring(Math.Min(slug.IndexOf("-") + 1, slug.Length));
			return slug;
		}
		public static bool UploadFile(IFormFile file, string path)
		{
			var fileName = System.IO.Path.GetFileName(file.FileName);
			var filePath = Path.Combine(path, fileName);

			//Create directory
			Directory.CreateDirectory(path);

			// Check If file with same name exists and delete it
			if (System.IO.File.Exists(filePath))
			{
				System.IO.File.Delete(filePath);
			}
			using (var localFile = System.IO.File.OpenWrite(filePath))
			using (var uploadedFile = file.OpenReadStream())
			{
				uploadedFile.CopyTo(localFile);
			}
			return true;
		}
		public static string ConcatWithSlash(List<string> strings)
		{
			// Use string.Join to concatenate the list with '/' as the delimiter
			return string.Join("/", strings);
		}

		public static string MailContent(string? title, string? body)
		{
			//  simple html template

			if (title == null || body == null)
			{
				title = "Thư gửi từ Đại Học Đại Nam";
				body = "Thủ tục của bạn đã được giải quyết thành công";
			}
			string template = @$"
			<!DOCTYPE html>
			<html lang=""en"">
			<head>
				<meta charset=""UTF-8"">
				<meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
				<title>Document</title>
			</head>
			<body>
				<h2 style=""color: black; "">{title}</h2>
				<p style=""color: black; "">{body}</p>
				<img width=""500"" src=""https://dainam.edu.vn/admin/upload/banner/dainam.png"" alt="""">
			</body>
			</html>

				
				";

			return template;
		}
		public async static Task<bool> SendMailResutl(ISendMailService _sendMailService)
		{
			MailContent content = new MailContent
			{
				To = "ngocanhit201@gmail.com",
				Subject = "DNU: Thông Báo Giải Quyết Thủ Tục",
				Body = GodMethod.MailContent(null, null)
			};
			await _sendMailService.SendMail(content);
			return true;
		}
	}
}
