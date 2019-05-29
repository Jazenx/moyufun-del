import { call, put, fork, select } from 'redux-saga/effects'
import FeedbackType, { JumpType, MessageType, Notification } from '../../constants/FeedbackTypes'
import { route } from '../../utils/common'

const methods = {
  jump(type, url) {
    switch (type) {
      case JumpType.BLANK: {
        // Chrome中会拦截窗口
        const aTag = document.createElement('a')
        aTag.href = url
        aTag.target = '_blank'
        aTag.click()
        break
      }
      case JumpType.SELF: {
        window.location.href = url
        break
      }
      case JumpType.HISTORY: {
        route(url)
        break
      }
      default:
        return url
    }
  },
  message(type, content) {
    switch(type) {
      case MessageType.SUCCESS:
        Messages.success(content)
        break
      
    }
  }
}

export default function feedbackFactory(feedback) {
  const feedbacks = Array.isArray(feedback) ? feedback : [feedback]
  feedbacks.forEach((fback) => {
    const { payload } = fback
    switch (fback.type) {
      case FeedbackType.JUMP:
        methods.jump(payload.type, payload.url)
        break
      case FeedbackType.MESSAGE:
        methods.jump(payload.type, payload.content)
        break
      case FeedbackType.NOTIFICATION:
        methods.jump(payload.type, payload.title, payload.content)
        break
      default:
        return feedback
    }
  })
}
