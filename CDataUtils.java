package test;

import org.apache.xmlbeans.XmlException;
import org.apache.xmlbeans.XmlObject;
import org.apache.xmlbeans.XmlOptions;

import java.io.*;

public class CDataUtils {
    private static final XmlOptions g_xopts;
    
    static {
        g_xopts = new XmlOptions();
        g_xopts.setUseCDataBookmarks();
        g_xopts.setSaveCDataEntityCountThreshold(Integer.MAX_VALUE);
        g_xopts.setSaveCDataLengthThreshold(Integer.MAX_VALUE);
    }
    
 
    
    // This will always remove CDATA as it is using Integer.MAX_VALUE for both lenght and entity
    public static XmlObject createobjectNoCATA(String in)
            throws XmlException, IOException
    {
        XmlOptions opts = new XmlOptions();
        ByteArrayInputStream bis = new ByteArrayInputStream(in.getBytes());
        InputStreamReader reader = new InputStreamReader(bis, "utf-8");
        XmlObject xobj = org.apache.xmlbeans.XmlObject.Factory.parse(reader, opts);
        return xobj;
    }

    
    // This can be used to add cdata by setting the two input parameters to low settings ( 1 and 1)
    public static XmlObject createobjectoptions(String in,  int
            setSaveCDataEntityCountThreshold, int setSaveCDataLengthThreshold)
            throws XmlException, IOException
    {

        XmlObject xmlobject1 = createobjectNoCATA(in);
        XmlOptions opts = new XmlOptions().setUseCDataBookmarks();

        opts.setSaveCDataEntityCountThreshold(setSaveCDataEntityCountThreshold);
        opts.setSaveCDataLengthThreshold(setSaveCDataLengthThreshold);

        String s = xmlobject1.xmlText(opts);
        XmlObject xobj = org.apache.xmlbeans.XmlObject.Factory.parse(s,
                opts); //the setSaveCData* options are ignored during parse
        return xobj;
    }

}
