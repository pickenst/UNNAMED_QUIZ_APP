package org.processors;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.processors.pdf.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

import io.github.cdimascio.dotenv.Dotenv;

public class App {
    static String relativePath = "../..";
    static String envPath = Paths.get(relativePath).toAbsolutePath().normalize().toString();

     static Dotenv dotenv = Dotenv.configure()
             .directory(envPath)   // Path to the directory containing the file
             .filename(".env.dev")
             .ignoreIfMissing()// Name of the env file
             .load();

    final static File outputDir = new File("./uploads");
     final static String QUEUE = dotenv.get("PROCESSOR_QUEUE");
     final static String USER = dotenv.get("RABBITMQ_DEFAULT_USER");
     final static String PASS = dotenv.get("RABBITMQ_DEFAULT_PASS");

    public static void main(String[] args) throws IOException, TimeoutException, InterruptedException {
         ConnectionFactory factory = new ConnectionFactory();
         factory.setHost("localhost");
         factory.setUsername(USER);
         factory.setPassword(PASS);
         Connection connection = null;
         Channel channel = null;

         while (connection == null) {
             try {
                 connection = factory.newConnection();
                 channel = connection.createChannel();
             } catch (IOException | TimeoutException e) {
                 System.out.println("Connection failed at " + QUEUE + ". Retrying in 5 seconds...");
                 Thread.sleep(5000);
             }
         }

         channel.queueDeclare(QUEUE, false, false, false, null);

         DeliverCallback deliverCallback = (consumerTag, delivery) -> {
             String message = new String(delivery.getBody(), "UTF-8");
             System.out.println("[x] recieved " + message);
         };
         channel.basicConsume(QUEUE, true, deliverCallback, consumerTag -> {});

         CountDownLatch latch = new CountDownLatch(1);
         latch.await();
    }

    static private void TestImageExtract(File pdfFile){
        try (PDDocument doc = Loader.loadPDF(pdfFile)){
            PDFImageExtractor extra = new PDFImageExtractor(outputDir);
            extra.extractImages(doc);
        } catch(IOException e){
            e.printStackTrace();
        }
    }

    static private void TestTextExtract(File pdfFile) throws IOException {
        PDFTextExtractor extra = new PDFTextExtractor(outputDir);
        try (PDDocument doc = Loader.loadPDF(pdfFile)) {
            extra.extractText(doc);
        } catch (IOException e){
            return;
        }
    }
}
