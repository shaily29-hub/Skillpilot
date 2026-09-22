package com.skillpilot.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty or missing");
        }

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "raw",
                        "folder", "skillpilot/resumes"
                )
        );

        Object url = uploadResult.get("secure_url");

        if (url == null) {
            throw new RuntimeException("Cloudinary upload failed: no URL returned");
        }

        return url.toString();
    }
}