import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';

export default class checkinSuccessModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
  }

  className() {
    return 'CheckinModal Modal--small';
  }

  title() {
    return (
      <div className="successTitle">
        {app.translator.trans('gtdxyz-checkin.forum.success')}
      </div>
    );
  }

  content() {
    // 获取签到相关的数据
    const checkin_days_count = app.session.user.attribute("checkin_days_count");
    const checkinReward = app.forum.attribute("checkinReward"); // 每日签到奖励
    const checkinSuccessText = app.forum.attribute("checkinSuccessText"); // 每日签到文字
    const checkinSuccessRewardText = app.forum.attribute("checkinSuccessRewardText"); // 每日签到奖励文字
    const checkinWeekReward = app.forum.attribute("checkinWeekReward"); // 连续签到奖励金额（例如：50）
    const checkinWeekDays = app.forum.attribute("checkinWeekDays") || 7; // 连续签到天数（默认7天）
    const checkinWeekRewardText = app.forum.attribute("checkinWeekRewardText"); // 连续签到奖励文字模板

    // 判断 money 插件是否存在
    const moneyExtensionExist = app.forum.attribute('gtdxyz-money-plus.moneyname') !== undefined;

    // 默认货币单位为“币”，优先读取后台设置
    let moneyName = app.forum.attribute('gtdxyz-money-plus.moneyname') || '币';

    // 设置展示文字的样式类名
    let successTextClassName = "CheckinModal hideText";
    let rewardTextClassName = "CheckinModal hideText";
    let weekRewardTextClassName = "CheckinModal hideText";

    // 每日签到文本处理
    let successText = "";
    if (checkinSuccessText !== "") {
      successText = checkinSuccessText.replace('[days]', checkin_days_count + 1);
      successTextClassName = "CheckinModal successText";
    }

    // 每日签到奖励处理
    let rewardText = "";
    if (moneyExtensionExist === true && checkinSuccessRewardText !== "") {
      rewardText = checkinSuccessRewardText.replace('[reward]', checkinReward + moneyName);
      rewardTextClassName = "CheckinModal rewardText";
    }

    // 连续签到奖励处理（例如每7天奖励50）
    let weekRewardText = "";
    if (
      moneyExtensionExist === true &&
      checkinWeekRewardText !== "" &&
      (checkin_days_count + 1) % checkinWeekDays === 0 &&
      checkinWeekReward > 0
    ) {
      weekRewardText = checkinWeekRewardText.replace('[reward]', checkinWeekReward + moneyName);
      weekRewardTextClassName = "CheckinModal weekRewardText";
    }

    // 渲染弹窗内容
    return (
      <div className="Modal-body">
        <div className={successTextClassName}>{successText}</div>
        <div className={rewardTextClassName}>{rewardText}</div>
        <div className={weekRewardTextClassName}>{weekRewardText}</div>
      </div>
    );
  }
}
