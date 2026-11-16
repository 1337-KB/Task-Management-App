package com.evans.task_management_api.util;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

public class EnvLoader {
    
    public static void loadEnv() {
        try {
            Properties props = new Properties();
            File envFile = new File(".env.local");
            
            if (envFile.exists()) {
                props.load(new FileInputStream(envFile));
                props.forEach((key, value) -> 
                    System.setProperty(key.toString(), value.toString())
                );
                System.out.println("✅ Environment variables loaded from .env.local");
            } else {
                System.out.println("ℹ️  .env.local not found, using system environment variables");
            }
        } catch (Exception e) {
            System.err.println("⚠️  Error loading .env.local: " + e.getMessage());
            System.out.println("Continuing with system environment variables");
        }
    }
}
