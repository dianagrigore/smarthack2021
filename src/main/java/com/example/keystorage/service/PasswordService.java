package com.example.keystorage.service;


import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;

import java.util.ArrayList;
import java.util.List;


public class PasswordService {

    public String generatePassword(int length, boolean alpha, boolean upper, boolean lower, boolean special, boolean num){
        CharacterRule digits = new CharacterRule(EnglishCharacterData.Digit);
        CharacterRule rule_1 = new CharacterRule(EnglishCharacterData.Alphabetical);
        CharacterRule rule_2 = new CharacterRule(EnglishCharacterData.UpperCase);
        CharacterRule rule_3 = new CharacterRule(EnglishCharacterData.LowerCase);
        CharacterRule rule_4 = new CharacterRule(EnglishCharacterData.Special);

        List<CharacterRule> rulesList = new ArrayList<>();
        if(alpha){
            rulesList.add(rule_1);
        }
        if(upper){
            rulesList.add(rule_2);
        }
        if(lower){
            rulesList.add(rule_3);
        }
        if(special){
            rulesList.add(rule_4);
        }
        if(num){
            rulesList.add(digits);
        }

        PasswordGenerator passwordGenerator = new PasswordGenerator();
        String password = passwordGenerator.generatePassword(length, rulesList);

        return password;
    }
}
