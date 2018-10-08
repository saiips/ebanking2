package com.dsb.eb2.framework.util;

import java.util.Collection;
import java.util.StringJoiner;


public class ObjectJoiner {

    private ObjectJoiner() {
    }

    /**
     * Join.
     *
     * @param separator the string to use as separator
     * @param arguments the array of objects (varargs) to join
     * @return the string resulting from joining the arguments (.toString()) together separated by the separator
     */
    public static String join(CharSequence separator, Object... arguments) {
        StringJoiner st = new StringJoiner(separator);
        if (arguments != null) {
            for (Object object : arguments) {
                if (object != null) {
                    if (object instanceof String) {
                        st.add((String) object);
                    } else {
                        st.add(object.toString());
                    }
                }
            }
        }
        return st.toString();
    }

    /**
     * Join.
     *
     * @param separator the string to use as separator
     * @param arguments the collection of objects to join
     * @return the string resulting from joining the arguments (.toString()) together separated by the separator
     */
    public static String join(CharSequence separator, Collection<? extends Object> arguments) {
        StringJoiner st = new StringJoiner(separator);
        if (arguments != null) {
            for (Object object : arguments) {
                if (object != null) {
                    if (object instanceof String) {
                        st.add((String) object);
                    } else {
                        st.add(object.toString());
                    }
                }
            }
        }
        return st.toString();
    }

    /**
     * Simply join the arguments, without separator.
     *
     * @param arguments The objects to join
     * @return the string resulting from joining the arguments (.toString()) together
     */
    public static String simplyJoin(Object... arguments) {
        return join("", arguments);
    }
}